import API from "../api/interceptors";

export const uploadImage = async (base64Image) => {
    return API.post('/upload-images', {
        image: base64Image
    });
};

export const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      // Event listener to handle when the file is read
      reader.onloadend = () => {
        resolve(reader.result);  // This is the base64 string
      };
      
      // Handle errors if any occur during the file reading process
      reader.onerror = reject;
      
      // Read the file as a base64-encoded string
      reader.readAsDataURL(file);
    });
  };