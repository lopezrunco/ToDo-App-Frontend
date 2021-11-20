import './style.scss'
import React from 'react'

// Components
import Card from './components/Card'
import NavBar from './components/NavBar'
import WelcomeSection from './components/WelcomeSection'
import Footer from './components/Footer'
import AccordionSection from './components/AccordionSection'
import ContactForm from './components/ContactForm'
import TabsSection from './components/TabsSection'

function Landing() {
    return (
        <div>
            <NavBar />
            <main>
                <WelcomeSection />

                {/* Cards Section */}
                <div id="tour" className="d-md-flex flex-md-equal w-100 ">
                    <Card backgroundColor="#f3969a" imageBackgroundColor="#f8f9fa" textColorClass="text-white" title="Aprende todo sobre nuestra app" subtitle="Haz nuestro tour en solo dos minutos" />
                    <Card backgroundColor="#f8f9fa" imageBackgroundColor="#f3969a" textColorClass="text-dark" title="Conoce todo lo bueno de Tasky" subtitle="No esperes mas para inegrarla a tu dia a dia" />
                </div>
                <div id="producto" className="d-md-flex flex-md-equal w-100 ">
                    <Card backgroundColor="#f8f9fa" imageBackgroundColor="#f3969a" textColorClass="text-dark" title="Tasky es lo mejor para gestionar tus tareas" subtitle="No mas dolores de cabeza" />
                    <Card backgroundColor="#78c2ad" imageBackgroundColor="#f8f9fa" textColorClass="text-white" title="Super valorizada en las App Stores" subtitle="Haz nuestro tour en solo dos minutos" />
                </div>

                <div id="funcionalidades" className="container my-5 pt-5">
                    <AccordionSection />
                </div>

                <div id="contacto" className="container my-5 pt-5">
                    <div className="row">
                        <div className="col-md-6">
                            <h2 className="mb-4">Formulario de contacto</h2>
                            <ContactForm />
                        </div>
                        <div className="col-md-6">
                            <h2 className="mb-4">Datos de contacto</h2>
                            <TabsSection />
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    )
}

export default Landing