import { House, Envelope, Phone, Telephone, Clock } from "react-bootstrap-icons"
import './style.scss'

function ContactInfo(props) {
    return (
        <div className="contact-info">
            <div className="item">
                <House />
                <p>{props.direction}</p>
            </div>
            <div className="item">
                <Envelope />
                <p>{props.email}</p>
            </div>
            <div className="item">
                <Phone />
                <p>{props.phone}</p>
            </div>
            <div className="item">
                <Telephone />
                <p>{props.tel}</p>
            </div>
            <div className="item">
                <Clock />
                <p>{props.hours}</p>
            </div>
        </div>
    )
}

export default ContactInfo