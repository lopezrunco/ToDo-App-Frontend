import logo from '../../assets/img/logo.png'
import './style.scss'

function Bottom() {
    return (
        <section className="bottom">
                <article className="container">
                    <div className="row">

                        <div className="col-md-6 about">
                            <img src={logo} alt="Duit Task App" />
                            <p>Our team is committed to remaining independent and deserving of your trust for as long as you need our applications.</p>
                            <div className="social">
                                <a href="/"><i className="fab fa-facebook"></i></a>
                                <a href="/"><i className="fab fa-twitter"></i></a>
                                <a href="/"><i className="fab fa-instagram"></i></a>
                                <a href="/"><i className="fab fa-github"></i></a>
                            </div>
                        </div>

                        <div className="col-md-3 nav-links">
                            <h3>Navigation</h3>
                            <a href="/">Home</a>
                            <a href="#plans">Plans</a>
                            <a href="#reviews">Reviews</a>
                        </div>
                        <div className="col-md-3 user-links">
                            <h3>User links</h3>
                            <a onClick="openLoginRegisterModal()">Login</a>
                            <a onClick="openLoginRegisterModal()">Register</a>
                        </div>

                    </div>
                </article>
            </section>
    )
}

export default Bottom