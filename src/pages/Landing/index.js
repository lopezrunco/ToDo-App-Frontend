import './style.css'
import Card from './components/Card'

function Landing() {

    // Extraccion de estilos en linea para reusarlos
    const cardStyle = { 
        width: '80%', 
        height: '300px', 
        borderRadius: '21px 21px 0 0' 
    }

    return (
        <div>

            <header className="site-header sticky-top py-1">
                <nav className="container d-flex flex-column flex-md-row justify-content-between">
                    <div className="py-2">
                        Tasky <i className="bi bi-check2-circle"></i>
                    </div>

                    <a className="py-2 d-none d-md-inline-block" href="#">Tour</a>
                    <a className="py-2 d-none d-md-inline-block" href="#">Producto</a>
                    <a className="py-2 d-none d-md-inline-block" href="#">Funcionalidades</a>
                    <a className="py-2 d-none d-md-inline-block" href="#">Soporte</a>
                </nav>
            </header>

            <main>
                <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
                    <div className="col-md-5 p-lg-5 mx-auto my-5">
                        <h1 className="display-4 fw-normal">Punny headline</h1>
                        <p className="lead fw-normal">And an even wittier subheading to boot. Jumpstart your marketing efforts with
                            this
                            example based on Apple’s marketing pages.</p>
                        <a className="btn btn-outline-secondary" href="home">Ingresar</a>
                    </div>
                    <div className="product-device shadow-sm d-none d-md-block"></div>
                    <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
                </div>

                <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
                    <Card backgroundColor="#f3969a" imageBackgroundColor="#f8f9fa" textColorClass="text-white" />
                    <Card backgroundColor="#f8f9fa" imageBackgroundColor="#f3969a" textColorClass="text-dark" />
                </div>

                <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
                    <Card backgroundColor="#f8f9fa" imageBackgroundColor="#f3969a" textColorClass="text-dark" />
                    <Card backgroundColor="#78c2ad" imageBackgroundColor="#f8f9fa" textColorClass="text-white" />
                </div>

                <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
                    <Card backgroundColor="#f3969a" imageBackgroundColor="#f8f9fa" textColorClass="text-white" />
                    <Card backgroundColor="#f8f9fa" imageBackgroundColor="#f3969a" textColorClass="text-dark" />
                </div>

                <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
                    <Card backgroundColor="#f8f9fa" imageBackgroundColor="#f3969a" textColorClass="text-dark" />
                    <Card backgroundColor="#78c2ad" imageBackgroundColor="#f8f9fa" textColorClass="text-white" />
                </div>
            </main>

            <footer className="container py-5">
                <div className="row">
                    <div className="col">
                        <h5>Features</h5>
                        <ul className="list-unstyled text-small">
                            <li><a className="link-secondary" href="#">Cool stuff</a></li>
                            <li><a className="link-secondary" href="#">Random feature</a></li>
                            <li><a className="link-secondary" href="#">Team feature</a></li>
                            <li><a className="link-secondary" href="#">Stuff for developers</a></li>
                            <li><a className="link-secondary" href="#">Another one</a></li>
                            <li><a className="link-secondary" href="#">Last time</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h5>Resources</h5>
                        <ul className="list-unstyled text-small">
                            <li><a className="link-secondary" href="#">Resource name</a></li>
                            <li><a className="link-secondary" href="#">Resource</a></li>
                            <li><a className="link-secondary" href="#">Another resource</a></li>
                            <li><a className="link-secondary" href="#">Final resource</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h5>Resources</h5>
                        <ul className="list-unstyled text-small">
                            <li><a className="link-secondary" href="#">Business</a></li>
                            <li><a className="link-secondary" href="#">Education</a></li>
                            <li><a className="link-secondary" href="#">Government</a></li>
                            <li><a className="link-secondary" href="#">Gaming</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h5>About</h5>
                        <ul className="list-unstyled text-small">
                            <li><a className="link-secondary" href="#">Team</a></li>
                            <li><a className="link-secondary" href="#">Locations</a></li>
                            <li><a className="link-secondary" href="#">Privacy</a></li>
                            <li><a className="link-secondary" href="#">Terms</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
            
        </div>
    )
}

export default Landing