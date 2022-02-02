import NavigationBar from '../../components/NavigationBar'
import HomeIntro from './components/HomeIntro'
import FeaturedInfoCards from './components/FeaturedInfoCards'
import Prices from './components/Prices'
import Reviews from './components/Reviews'
import Bottom from '../../components/Bottom'
import Footer from '../../components/Footer'

import './style.scss'

function Landing() {
    return (
        <div>
            <NavigationBar />
            <main>
                <HomeIntro />
                <FeaturedInfoCards />
                <Prices />
                <Reviews />
                <Bottom />
            </main>
            <Footer />
        </div>

    )
}

export default Landing