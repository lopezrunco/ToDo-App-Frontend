function FeaturedInfoCardItem(props) {
    return(
        <div className="col-lg-4">
            <div className="featured-info-col">
                <i className={props.iconClassName}></i>
                <h6>{props.title}</h6>
                <p>{props.content}</p>
            </div>
        </div>
    )
}

export default FeaturedInfoCardItem