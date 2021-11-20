import { Check2Circle } from 'react-bootstrap-icons'
import { Nav } from 'react-bootstrap'

function NavBar() {
    return (
        <header className="site-header sticky-top py-1">
            <Nav activeKey="/" className="container d-flex flex-column flex-md-row justify-content-between" >
                <Nav.Item>
                    <Nav.Link href="/#">Tasky <Check2Circle /></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/#tour">Tour</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/#producto">Producto</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/#funcionalidades">Funcionalidades</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/#contacto">Contacto</Nav.Link>
                </Nav.Item>
            </Nav>
        </header>
    )
}

export default NavBar