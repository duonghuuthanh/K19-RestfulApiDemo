import { useEffect, useState, useContext } from "react"
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import API, { endpoints } from "../configs/API"
import { UserContext } from "../configs/MyContext"

const Header = () => {
    const [categories, setCategories] = useState([])
    const [user, dispatch] = useContext(UserContext)
    const [q, setQ] = useState()
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

    const logout = () => {
        dispatch({
            "type": "logout"
        })
    }

    let userInfo = (
        <>
            <Link to="/login" className="nav-link text-success">&#129489; Đăng nhập</Link>
            <Link to="/register" className="nav-link text-success">&#129489; Đăng ký</Link>
        </>
    )
    if (user !== null)
        userInfo = (
            <>
                <Link to="/login" className="nav-link text-danger">&#129489; Welcome {user.username}</Link>
                <Button className="btn btn-danger" onClick={logout}>Đăng xuất</Button>
            </>
        )

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">&#127941; e-Course Web</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link to="/" className="nav-link active">&#127968; Trang chủ</Link>
                    {categories.map(c => {
                        let url = `/?cateId=${c.id}`
                        return <Link key={c.id} className="nav-link" to={url}>{c.name}</Link>
                    })}

                    {userInfo}

                </Nav>
                <Form onSubmit={search} className="d-flex">
                  <Form.Control type="search" placeholder="Tên khóa học..."
                        className="me-2" aria-label="Search" value={q}
                        onChange={evt => setQ(evt.target.value)} />
                  <Button type="submit" variant="outline-success">Tìm</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header