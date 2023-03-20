import { useEffect, useState } from "react"
import { Container, Form, Nav, Navbar, Button } from "react-bootstrap"
import API, { endpoinds } from "../configs/API"

const Header = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const loadCategories = async () => {
            const res = await API.get(endpoinds['categories'])
            setCategories(res.data)
        }

        loadCategories()
    }, [])

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">e-Course Web</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Trang chu</Nav.Link>
                    {categories.map(c => <Nav.Link href="#link">{c.name}</Nav.Link>)}
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Nhập tên khóa học..."
                    className="me-2"
                    aria-label="Searcj"
                  />
                  <Button variant="outline-success">Tìm</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header