function PriceCardItem(props) {
    return (

        <div className="col-md-6 col-lg-4">
            <div className="price-card">
                <div className="icon-bg">
                    <i className={props.iconClassName}></i>
                    <h2>{props.title}</h2>
                </div>
                <ul className="plan-items-list">
                    <li><i className="fas fa-check"></i>{props.checkListItemOne}</li>
                    <li><i className="fas fa-check"></i>{props.checkListItemTwo}</li>
                    <li><i className="fas fa-check"></i>{props.checkListItemThree}</li>
                    <li><i className="fas fa-check"></i>{props.checkListItemFour}</li>
                </ul>
                <div className="price">
                    <div className="number"><sup>$</sup>{props.price}</div>
                    <div className="line"></div>
                    <div className="detail">per<br />month</div>
                </div>
                <a href="/" className="button secondary-button">Get started</a>
            </div>
        </div>

    )
}

export default PriceCardItem