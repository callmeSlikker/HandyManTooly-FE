import { useNavigate, useParams } from "react-router-dom";
import BackButtonPage from "./BackButtonPage";
import useUserStore from "./store/useUserStore";
import { useEffect, useState } from "react";
import { getUserById } from "./services/userService";
import ClickableStarRating from "./components/ClickableStartRating";
import { review } from "./services/reviewService";
import ErrorMessage from "./components/ErrorMessage";
import LoadingIndicator from "./components/LoadingIndicator";

const Review = () => {

    const { userId } = useParams(); // Extract postId from the URL
    const { userInfo } = useUserStore();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [comment, setComment] = useState(null);
    const [formErrors, setFormErrors] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchUserById = async () => {
            const response = await getUserById(userId);
            setUser(response.data)

            if (response.data.reviews.some(review => review.reviewerId === userInfo._id)) {
                navigate("/posts")
            }

        }
        if (userInfo) {
            fetchUserById();
        }
    }, [])

    const [rating, setRating] = useState(0); // Store the selected rating

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!rating) return setFormErrors("กรุณาให้คะแนน")
        if (!comment) return setFormErrors("กรุณาแสดงความคิดเห็น")

        setLoading(true)
        setFormErrors("");

        try {
            await review({
                reviewerId: userInfo._id,
                userId,
                review: comment,
                rating
            })
            navigate(`/users/${userId}`)
        } catch (error) {

        } finally {
            setLoading(false)
        }

    }

    if (loading) return <LoadingIndicator />;;

    return (
        <>
            {userInfo && user && (
                <div style={{ flex: 1, display: 'flex', flexDirection: "column" }}>
                    <BackButtonPage />
                    <form onSubmit={handleSubmit} style={{ display: "flex", padding: 32, flexDirection: "column", flex: 1, justifyContent: "center" }}>
                        <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "center" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8, justifyContent: "center", alignItems: "center" }}>
                                <img
                                    src={userInfo.imageUrl}
                                    alt={userInfo.imageUrl}
                                    style={{
                                        width: 100,
                                        aspectRatio: "1/1",
                                        borderRadius: "50%",
                                    }}
                                />
                                <span style={{ fontSize: 16, color: "white" }}>{userInfo.name}</span>
                            </div>
                            <h1 style={{ color: "white" }}> => </h1>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8, justifyContent: "center", alignItems: "center" }}>
                                <img
                                    src={user.imageUrl}
                                    alt={user.imageUrl}
                                    style={{
                                        width: 100,
                                        aspectRatio: "1/1",
                                        borderRadius: "50%",
                                    }}
                                />
                                <span style={{ fontSize: 16, color: "white" }}>{user.name}</span>
                            </div>
                        </div>
                        <p
                            style={{
                                color: "#FFFFFF",
                                fontSize: 16,
                                fontWeight: 600,
                                marginTop: 32,
                                textAlign: "left"
                            }}
                        >
                            คะแนนการทำงาน
                        </p>

                        <ClickableStarRating rating={rating} setRating={setRating} />
                        <p
                            style={{
                                color: "#FFFFFF",
                                fontSize: 16,
                                fontWeight: 600,
                                marginTop: 32,
                                textAlign: "left"
                            }}
                        >
                            คำอธิบายการทำงาน
                        </p>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={7} // Minimum rows
                            style={{
                                width: "100%",
                                resize: "vertical", // Allow resizing
                                fontSize: "16px",
                                padding: "10px",
                                borderRadius: 10,
                            }}
                        ></textarea>
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
                            ยืนยัน
                        </button>
                    </form>
                </div>
            )}
        </>
    )

}

export default Review;