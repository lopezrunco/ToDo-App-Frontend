function ReviewsSliderItem(props) {
    return (

        <div className="slider-item">
            <div className="left-content">
                <i className={props.iconClassName}></i>
            </div>
            <div className="right-content">
                <h3>{props.title}</h3>
                <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                </div>
                <p>{props.text}</p>
            </div>
        </div>

    )
}

export default ReviewsSliderItem