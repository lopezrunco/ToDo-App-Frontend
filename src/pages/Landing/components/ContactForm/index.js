import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function ContactForm() {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Ej: Carlos Gomez" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Ej: carlitox@gmail.com" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSubject">
                <Form.Label>Asunto</Form.Label>
                <Form.Control type="text" placeholder="Ej: Quiero usar la app" />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicSubject">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control as="textarea" aria-label="With textarea" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Enviarme copia" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Enviar!
            </Button>
        </Form>
    )
}

export default ContactForm