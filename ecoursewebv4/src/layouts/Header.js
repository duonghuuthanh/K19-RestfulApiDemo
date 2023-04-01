import { useEffect, useState } from "react"
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import API, { endpoints } from "../configs/API"

const Header = () => {
    const [categories, setCategories] = useState([])
    const [q, setQ] = useState("")
    const nav = useNavigate()

    useEffect(() => {
        const loadCategories = async () => {
            let res = await API.get(endpoints['categories'])
            setCategories(res.data)
        }

        loadCategories()
    }, [])

    const search = (evt) => {
        evt.preventDefault()
        nav(`/?q=${q}`)
    }

    return (
        <>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">&#9997; e-Course Web</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link className="nav-link" to="/">Trang chủ</Link>
                    {categories.map(c => {
                        let url = `/?cateId=${c.id}`

                        return <Link className="nav-link" to={url} key={c.id}>{c.name}</Link>
                    })}
                   
                </Nav>
                <Form onSubmit={search} className="d-flex">
                    <Form.Control type="search" placeholder="Tên khóa học..."
                        className="me-2" aria-label="Search" value={q}
                        onChange={e => setQ(e.target.value)} />
                    <Button type="submit" variant="outline-success">Tìm</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </>
    )
}

export default Header