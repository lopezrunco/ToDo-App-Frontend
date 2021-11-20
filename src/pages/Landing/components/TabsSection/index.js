import { Row, Tab, Col, Nav, Sonnet } from 'react-bootstrap'
import ContactInfo from './Components/ContactInfo'

function TabsSection() {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first">Montevideo</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Miami</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="third">Londres</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>

                        <Tab.Pane eventKey="first">
                            <ContactInfo direction="Ellauri 2725, Montevideo" email="taskymdeo@gmail.com" phone="099123456" tel="43521234" hours="Lunes a viernes de 8:00 a 20:00" />
                        </Tab.Pane>

                        <Tab.Pane eventKey="second">
                            <ContactInfo direction="One Street 546, Miami" email="taskymiami@gmail.com" phone="787634w35576678" tel="234545634" hours="Lunes a viernes de 6:00 a 18:00" />
                        </Tab.Pane>

                        <Tab.Pane eventKey="third">
                            <ContactInfo direction="TheLast Street 25654, Londres" email="taskyuk@gmail.com" phone="7654342345" tel="9876345" hours="Lunes a viernes de 9:00 a 21:00" />
                        </Tab.Pane>

                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export default TabsSection