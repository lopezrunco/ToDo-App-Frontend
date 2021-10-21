function Card(props) {

    const cardImageStyle = { 
        width: '80%', 
        height: '300px', 
        borderRadius: '21px 21px 0 0' ,
        backgroundColor: props.imageBackgroundColor
    }

    let cardTitleClassNames = 'display-5'

    if (props.textColorClass) {
        cardTitleClassNames += ' ' + props.textColorClass
    }

    let cardSubTitleClassNames = 'lead'

    if (props.textColorClass) {
        cardSubTitleClassNames += ' ' + props.textColorClass
    }

    return (
        <div className={"me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden"} style={{ backgroundColor: props.backgroundColor }}>
            <div className="my-3 py-3">
                <h2 className={cardTitleClassNames}>Another headline</h2>
                <p className={cardSubTitleClassNames}>And an even wittier subheading.</p>
            </div>
            <div className="shadow-sm mx-auto" style={cardImageStyle}></div>
        </div>
    )
}

export default Card