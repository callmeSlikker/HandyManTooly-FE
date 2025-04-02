const StarRating = ({ averageReview }) => {
    return (
        <div className="star-rating">
            {[...Array(5)].map((_, index) => {
                return (
                    <span
                        key={index}
                        className={
                            index < averageReview
                                ? "filled-star"
                                : "empty-star"
                        }
                    >
                        ★
                    </span>
                );
            })}
        </div>
    )
}

export default StarRating;