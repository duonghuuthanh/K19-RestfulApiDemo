import { useContext, useEffect, useState } from "react"
import { Container, Form, Nav, Navbar, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import API, { endpoinds } from "../configs/API"
import { UserContext } from "../configs/MyContext"

const Header = () => {
    const [categories, setCategories] = useState([])
    const [kw, setKw] = useState()
    const nav = useNavigate()
    const [user, dispatch] = useContext(UserContext)

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

    const logout = () => {
        dispatch({"type": "logout"})
    }

    let userInfo = <>
        <Link className="nav-link text-danger" to="/login">&#128119; Đăng nhập</Link>
        <Link className="nav-link text-success" to="/register">&#128119; Đăng ký</Link>
    </>

    if (user !== null)
        userInfo = (
            <>
                <Link className="nav-link text-danger" to="/login">
                    <img src={user.image} width={40} alt={user.username} className="rounded-circle" />

                    <span className="text-info">Welcome {user.username}!</span>
                </Link>
                <Button onClick={logout}>&#128119; Đăng xuất</Button>
            </>
        )

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">e-Course Web</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link className="nav-link" to="/">Trang chủ</Link>
                    
                    {categories.map(c => {
                        let url = `/?category_id=${c.id}`
                        return <Link className="nav-link" to={url}>{c.name}</Link>
                    })}

                    {userInfo}
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