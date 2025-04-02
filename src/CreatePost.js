import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButtonPage from "./BackButtonPage";
import {
  getProvinces,
  getAmphures,
  getTambons,
} from "./services/locationService";
import API from "./api/interceptors";
import { createPost } from "./services/postService";
import { FilePond } from "react-filepond";
import 'filepond/dist/filepond.min.css';
import LoadingIndicator from "./components/LoadingIndicator";
import LoadingSpinner from "./components/LoadingSpinner";
import { convertFileToBase64, uploadImage } from "./services/imageService";
import useUserStore from "./store/useUserStore";
import ErrorMessage from "./components/ErrorMessage";

const CreatePost = () => {
  const [job, setJob] = useState("");
  const [minimumPrice, setMinimumPrice] = useState("");
  const [maximumPrice, setMaximumPrice] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState([]); // Store services array
  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [tambons, setTambons] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedAmphure, setSelectedAmphure] = useState("");
  const [selectedTambon, setSelectedTambon] = useState("");
  const [image, setImage] = useState(null); // To store the image file
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [imageError, setImageError] = useState("");

  const navigate = useNavigate();
  const { userInfo } = useUserStore();

  useEffect(() => {
    const fetchProvinces = async () => {
      setLoadingLocations(true);
      try {
        const response = await getProvinces();
        setProvinces(response.data);
      } catch (err) {
        setError("Failed to fetch provinces.");
      } finally {
        setLoadingLocations(false);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchAmphures = async () => {
        setLoadingLocations(true);
        try {
          const response = await getAmphures(selectedProvince);
          setAmphures(response.data);
        } catch (err) {
          setError("Failed to fetch amphures.");
        } finally {
          setLoadingLocations(false);
        }
      };
      fetchAmphures();
    }
  }, [selectedProvince]);

  // Fetch tambons when an amphure is selected
  useEffect(() => {
    if (selectedAmphure) {
      const fetchTambons = async () => {
        setLoadingLocations(true);
        try {
          const response = await getTambons(selectedProvince, selectedAmphure);
          setTambons(response.data);
        } catch (err) {
          setError("Failed to fetch tambons.");
        } finally {
          setLoadingLocations(false);
        }
      };
      fetchTambons();
    }
  }, [selectedAmphure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) return setFormErrors("กรุณาเลือกรูปภาพ");
    if (!job) return setFormErrors("กรุณากรอกชื่องาน");
    if (!minimumPrice) return setFormErrors("กรุณากรอกราคาต่ำสุด");
    if (!maximumPrice) return setFormErrors("กรุณากรอกราคาสูงสุด");
    if (!description) return setFormErrors("กรุณากรอกรายละเอียดงาน");
    if (!selectedProvince) return setFormErrors("กรุณาเลือกจังหวัด");
    if (!selectedAmphure) return setFormErrors("กรุณาเลือกอำเภอ");
    if (!selectedTambon) return setFormErrors("กรุณาเลือกตำบล");

    setFormErrors("")
    setImageError("")
    setLoading(true);
    try {

      const base64Image = await convertFileToBase64(image);

      const response = await uploadImage(base64Image)

      const imageUrl = response.data.imageUrl; // Cloudinary URL

      const postData = {
        title: job,
        minimumPrice: parseInt(minimumPrice),
        maximumPrice: parseInt(maximumPrice),
        description,
        provinceId: parseInt(selectedProvince),
        amphureId: parseInt(selectedAmphure),
        tambonId: parseInt(selectedTambon),
        imageUrl,
        services,
        userId: userInfo._id,
      };

      await createPost(postData);
      navigate("/posts");
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (fileItems) => {
    if (fileItems.length > 0) {
      const file = fileItems[0].file;
      if (file.size > 2 * 1024 * 1024) { // 2MB in bytes
        setImageError("ขนาดไฟล์ควรมีขนาดต่ำกว่า 2 MB");
        return;
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

      if (!allowedTypes.includes(file.type)) {
        setImageError("โปรดเลือกนามสกุลไฟล์ที่ลงท้ายด้วย jpeg png และ jpg เท่านั้น");
        return;
      }


      setImageError("")
      setImage(fileItems[0].file); // Assuming the fileItems array contains at least one file
    } else {
      setImageError("")
      setImage(null); // Handle case when no file is selected
    }
  };

  const handleInputServiceChange = (index, value) => {
    const updatedServices = [...services];
    updatedServices[index] = value;
    setServices(updatedServices);
  };

  // Function to add a new input row
  const addService = () => {
    setServices([...services, ""]); // Add an empty string as a new input row
  };

  // Function to delete a specific input row
  const deleteService = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  if (loading) return <LoadingIndicator />;;
  if (error) return <p>{error}</p>;

  return (
    <>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <BackButtonPage
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1000,
          }}
        />
        <div className="input-group">
          <p
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 600,
            }}
            className="label"
          >
            เลือกรูปภาพ
          </p>
          <FilePond
            allowMultiple={false}
            onupdatefiles={handleImageChange}
            name="image"
            labelIdle=""
            acceptedFileTypes={['image/jpeg', 'image/png', 'image/jpg']}
          />
          <ErrorMessage message={imageError} />
          {image && (
            <img src={URL.createObjectURL(image)} alt="Preview" style={{ width: "100%" }} />
          )}
        </div>
        <div className="input-group">
          <p
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 600,
            }}
            className="label"
          >
            ชื่องาน
          </p>
          <input
            type="text"
            placeholder=""
            value={job}
            onChange={(e) => setJob(e.target.value)}
            className="input-field"
            style={{
              color: "black",
              backgroundColor: "#D9D9D9",
              fontSize: 16,
              paddingBlock: 16,
              border: "2px solid #D9D9D9",
              borderRadius: 10,
            }}
          />
        </div>

        <div className="input-group">
          <p
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 600,
            }}
            className="label"
          >
            ราคาต่ำสุด (บาท)
          </p>
          <input
            type="number"
            placeholder=""
            value={minimumPrice}
            onChange={(e) => setMinimumPrice(e.target.value)}
            className="input-field"
            style={{
              color: "black",
              backgroundColor: "#D9D9D9",
              fontSize: 16,
              paddingBlock: 16,
              border: "2px solid #D9D9D9",
              borderRadius: 10,
            }}
          />
        </div>

        <div className="input-group">
          <p
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 600,
            }}
            className="label"
          >
            ราคาสูงสุด (บาท)
          </p>
          <input
            type="number"
            placeholder=""
            value={maximumPrice}
            onChange={(e) => setMaximumPrice(e.target.value)}
            className="input-field"
            style={{
              color: "black",
              backgroundColor: "#D9D9D9",
              fontSize: 16,
              paddingBlock: 16,
              border: "2px solid #D9D9D9",
              borderRadius: 10,
            }}
          />
        </div>

        <div className="input-group">
          <p
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 600,
            }}
            className="label"
          >
            รายละเอียดงาน
          </p>
          <input
            type="text"
            placeholder=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
            style={{
              color: "black",
              backgroundColor: "#D9D9D9",
              fontSize: 16,
              paddingBlock: 16,
              border: "2px solid #D9D9D9",
              borderRadius: 10,
            }}
          />
        </div>

        <div className="input-group">
          <p
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 600,
            }}
            className="label"
          >
            บริการ
          </p>
          {services.map((service, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
              <input
                type="text"
                placeholder=""
                value={service}
                onChange={(e) => handleInputServiceChange(index, e.target.value)}
                className="input-field"
                style={{
                  flex: 1,
                  color: "black",
                  backgroundColor: "#D9D9D9",
                  fontSize: 16,
                  padding: 12,
                  border: "2px solid #D9D9D9",
                  borderRadius: 10,
                  marginRight: 8,
                }}
              />
              {/* Delete Button */}
              {services.length > 0 && (
                <button
                  type="button"
                  onClick={() => deleteService(index)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 18,
                    color: "white",
                    width: "15%",
                    backgroundColor: "red",
                    borderRadius: 10
                  }}
                >
                  ลบ
                </button>
              )}
            </div>
          ))}

          {/* Add Button */}
          <button
            type="button"
            onClick={addService}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: 18,
              color: "white",
              width: "15%",
              backgroundColor: "rgb(0 67 255)",
              borderRadius: 10,
              width: "100%",

            }}
          >
            เพิ่มบริการ
          </button>
        </div>

        {loadingLocations ? (
          <div style={{ display: "flex", justifyContent: "center", padding: 10 }}>
            <LoadingSpinner />
          </div>

        ) : (
          <>
            <select
              onChange={(e) => setSelectedProvince(e.target.value)}
              value={selectedProvince}
              className="select-field"
              style={{
                color: "black",
                backgroundColor: "#D9D9D9",
                fontSize: 16,
                paddingBlock: 16,
                border: "2px solid #D9D9D9",
                borderRadius: 10,
                marginTop: 32,
              }}
            >
              <option value="">เลือกจังหวัด</option>
              {provinces.map((province) => (
                <option key={province.provinceId} value={province.provinceId}>
                  {province.nameTH}
                </option>
              ))}
            </select>

            <select
              onChange={(e) => setSelectedAmphure(e.target.value)}
              value={selectedAmphure}
              disabled={!selectedProvince}
              className="select-field"
              style={{
                color: "black",
                backgroundColor: "#D9D9D9",
                fontSize: 16,
                paddingBlock: 16,
                border: "2px solid #D9D9D9",
                borderRadius: 10,
                marginTop: 32,
              }}
            >
              <option value="">เลือกอำเภอ</option>
              {amphures.map((amphure) => (
                <option key={amphure.amphureId} value={amphure.amphureId}>
                  {amphure.nameTH}
                </option>
              ))}
            </select>

            <select
              onChange={(e) => setSelectedTambon(e.target.value)}
              value={selectedTambon}
              disabled={!selectedAmphure}
              className="select-field"
              style={{
                color: "black",
                backgroundColor: "#D9D9D9",
                fontSize: 16,
                paddingBlock: 16,
                border: "2px solid #D9D9D9",
                borderRadius: 10,
                marginTop: 32,
              }}
            >
              <option value="">เลือกตำบล</option>
              {tambons.map((tambon) => (
                <option key={tambon.tambonId} value={tambon.tambonId}>
                  {tambon.nameTH}
                </option>
              ))}
            </select>
          </>
        )}

        <ErrorMessage message={formErrors} />

        <button
          type="submit"
          className="submit-button"
          style={{
            display: "flex",
            color: "#1E90FF",
            backgroundColor: "#D9D9D9",
            fontSize: 16,
            fontWeight: 600,
            paddingBlock: 5,
            border: "2px solid #D9D9D9",
            borderRadius: 10,
            marginTop: 32,
            width: "fit-content",
            alignSelf: "center",
            paddingLeft: 32,
            paddingRight: 32,
          }}
        >
          โพสต์
        </button>
      </form>
    </>
  );
};

export default CreatePost;
