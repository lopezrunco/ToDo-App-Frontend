import logo from '../../../../assets/img/logo.png'
import './style.scss'

function LandingHeader() {
    return (
        <header>
            <div className="logo">
                <a href="index.html"><img src={logo} alt="Duit Task App" /></a>
            </div>
            <nav id="menu">
                <ul>
                    <li><a href="#plans">Plans</a></li>
                    <li><a href="#reviews">Reviews</a></li>
                    <li><a onClick="openLoginRegisterModal()">Login</a></li>
                    <li><a onClick="openLoginRegisterModal()">Register</a></li>
                </ul>
            </nav>
            <div className="menu-toggle">
                <i className="fa fa-bars"></i>
            </div>
        </header>
    )
}

export default LandingHeader