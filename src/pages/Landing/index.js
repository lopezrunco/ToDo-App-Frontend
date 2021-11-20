import './style.scss'
import React from 'react'

// Components
import Card from './components/Card'
import NavBar from './components/NavBar'
import WelcomeSection from './components/WelcomeSection'
import Footer from './components/Footer'


function Landing() {
    return (
        <div>
            <NavBar />
            <main>
                <WelcomeSection />
                <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
                    <Card backgroundColor="#f3969a" imageBackgroundColor="#f8f9fa" textColorClass="text-white" />
                    <Card backgroundColor="#f8f9fa" imageBackgroundColor="#f3969a" textColorClass="text-dark" />
                </div>
                <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
                    <Card backgroundColor="#f8f9fa" imageBackgroundColor="#f3969a" textColorClass="text-dark" />
                    <Card backgroundColor="#78c2ad" imageBackgroundColor="#f8f9fa" textColorClass="text-white" />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Landing