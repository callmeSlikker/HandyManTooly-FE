const ClickableStarRating = ({ rating, setRating }) => {

    return (
        <div className="star-rating">
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1; // Star value (1-5)

                return (
                    <span
                        style={{fontSize: 48}}
                        key={index}
                        className={starValue <= rating ? "filled-star" : "empty-star"}
                        onClick={() => setRating(starValue)} // Click to set rating
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
};

export default ClickableStarRating;