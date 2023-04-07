import { useContext, useEffect, useState } from "react"
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import API, { endpoints } from "../configs/API"
import { UserContext } from "../configs/MyContext"

const Header = () => {
    const [categories, setCategories] = useState([])
    const [q, setQ] = useState("")
    const nav = useNavigate()
    const [user, dispatch] = useContext(UserContext)

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
            <Link to="/login" className="nav-link text-success">&#128104; Đăng nhập</Link>
        </>
    )

    if (user !== null)
        userInfo = (
            <>
                <Link to="/" className="nav-link text-success">
                    <img alt={user.username} src={user.image} width="40" className="rounded-circle" />
                    Welcome {user.username}!
                </Link>
                <button onClick={logout} className="btn btn-success">&lt;&lt; Đăng xuất</button>
            </>
        )

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link className="navbar-brand" to="/">e-Course Web</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link to="/" className="nav-link active">&#127968; Trang chủ</Link>
                    {categories.map(c => {
                        let url = `/?cateId=${c.id}`
                        return <Link className="nav-link" to={url} key={c.id}>{c.name}</Link>
                    })}

                    {userInfo}
                </Nav>
                <Form onSubmit={search} className="d-flex">
                    <Form.Control
                    type="search"
                    placeholder="Tên khóa học..."
                    className="me-2"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    aria-label="Tìm"
                    />
                    <Button type="submit" variant="outline-success">Tìm</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header