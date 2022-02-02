import PriceCardItem from '../PriceCardItem'
import './style.scss'

function Prices() {
    return (

        <section className="prices" id="plans">
            <article className="container">

                <div className="row title">
                    <div className="col">
                        <h2>Our plans</h2>
                        <div className="separator"></div>
                        <p>We have many plans depending on the rhythm of your life. <br />
                            Select what is best for you.</p>
                    </div>
                </div>

                <div className="row prices-content">

                    <PriceCardItem 
                        iconClassName="fas fa-briefcase" 
                        title="Basic" 
                        checkListItemOne="Max 10 Task boards" 
                        checkListItemTwo="100 tasks for board" 
                        checkListItemThree="2gb of storage" 
                        checkListItemFour="No user assistance" 
                        price="18"
                    />

                    <PriceCardItem 
                        iconClassName="fas fa-paper-plane" 
                        title="Standard" 
                        checkListItemOne="Max 10 Task boards" 
                        checkListItemTwo="500 tasks for board" 
                        checkListItemThree="10gb of storage" 
                        checkListItemFour="24/7 user assistance" 
                        price="38"
                    />

                    <PriceCardItem 
                        iconClassName="fas fa-rocket" 
                        title="Advanced" 
                        checkListItemOne="Max 500 Task boards" 
                        checkListItemTwo="1000 tasks for board" 
                        checkListItemThree="100gb of storage" 
                        checkListItemFour="24/7 user assistance" 
                        price="58"
                    />

                </div>

            </article>
        </section>

    )
}

export default Prices