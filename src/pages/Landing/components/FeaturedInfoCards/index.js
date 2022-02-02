import './style.scss'

// Components
import FeaturedInfoCardItem from '../FeaturedInfoCardItem'

function FeaturedInfoCards() {
    return (
        <section className="featured-info">
            <article className="container">
                <div className="row">

                    <FeaturedInfoCardItem 
                        iconClassName="far fa-calendar-alt" 
                        title="Start each day feeling calm and in control" 
                        content="Have a clear idea of ​​everything you have to do and never lose track of an important task." 
                    />

                    <FeaturedInfoCardItem 
                        iconClassName="fas fa-brain" 
                        title="From overwhelm to total control" 
                        content="Everything is properly organized and recorded so that you can progress on things that matters." 
                    />

                    <FeaturedInfoCardItem 
                        iconClassName="fas fa-share-square" 
                        title="Share tasks with your mates" 
                        content="Whit Duit, you can easily share tasks with your coworkers or friends to make your day easier." 
                    />

                </div>
            </article>
        </section>
    )
}

export default FeaturedInfoCards