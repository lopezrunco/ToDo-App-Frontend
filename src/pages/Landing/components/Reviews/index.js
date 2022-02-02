import ReviewsSliderItem from '../ReviewsSliderItem'
import './style.scss'

function Reviews() {
    return (

        <section className="reviews" id="reviews">
            <article className="container">

                <div className="row title">
                    <div className="col">
                        <h2>Popular reviews</h2>
                        <div className="separator"></div>
                        <p>The main technology portals have valued Duit. <br />Positioning ourselves among the best in the world.</p>
                    </div>
                </div>

                <div className="reviews-slider">
                    <div className="slider-container">

                        <ReviewsSliderItem 
                            iconClassName="fab fa-google-play" 
                            title="Google Play" 
                            text="Very good, easy to use, very useful, very practical, very comfortable and it organizes your tasks phenomenally, taking the trouble of thinking about what you have to do where you have to write it down."
                        />

                        <ReviewsSliderItem 
                            iconClassName="fab fa-app-store" 
                            title="App Store" 
                            text="Excellent. I used to use other task apps, but it was super slow to accommodate everything I had to work on. Now with this application I can organize all my work and it has a way of organizing projects, which I love."
                        />

                        <ReviewsSliderItem 
                            iconClassName="fab fa-vuejs" 
                            title="The Verge" 
                            text="I've tried a handful of to do lists on my phone over the years. Duit is hands down my favorite. It has a sleek minimalist interface. I find swiping a task when I complete it to be very satisfying."
                        />

                    </div>
                </div>


            </article>

            <article className="reviews-footer-image"></article>

        </section>

    )
}

export default Reviews