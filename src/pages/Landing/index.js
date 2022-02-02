import { useContext } from 'react'
import { AuthContext } from '../../App'

import './style.scss'

// Components
// import LandingHeader from './components/LandingHeader'
import NavigationBar from '../../components/NavigationBar'
import HomeIntro from './components/HomeIntro'
import FeaturedInfoCards from './components/FeaturedInfoCards'
import Prices from './components/Prices'
import Reviews from './components/Reviews'
import Bottom from '../../components/Bottom'
import Footer from '../../components/Footer'
// import GoToTop from '../../components/GoToTop'

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
                {/* <GoToTop /> */}
            </main>
            <Footer />
        </div>

    )
}

export default Landing