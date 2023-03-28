import { useEffect, useState } from "react"
import { Container, Form, Nav, Navbar, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import API, { endpoinds } from "../configs/API"

const Header = () => {
    const [categories, setCategories] = useState([])
    const [kw, setKw] = useState()
    const nav = useNavigate()

    useEffect(() => {
        const loadCategories = async () => {
            const res = await API.get(endpoinds['categories'])
            setCategories(res.data)
        }

        loadCategories()
    }, [])

    const search = (evt) => {
        evt.preventDefault()
        nav(`/?kw=${kw}`)
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">e-Course Web</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link className="nav-link" href="#home">Trang chủ</Link>
                    {categories.map(c => {
                        let url = `/?category_id=${c.id}`
                        return <Link className="nav-link" to={url}>{c.name}</Link>
                    })}
                </Nav>
                <Form onSubmit={search} className="d-flex">
                  <Form.Control
                    value={kw}
                    onChange={evt => setKw(evt.target.value)}
                    type="search"
                    placeholder="Nhập tên khóa học..."
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button type="submit" variant="outline-success">Tìm</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header