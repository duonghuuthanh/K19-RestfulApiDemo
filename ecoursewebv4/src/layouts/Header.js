import { useContext, useEffect, useState } from "react"
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import API, { endpoints } from "../configs/API"
import { MyUserContext } from "../configs/MyContext"

const Header = () => {
    const [categories, setCategories] = useState([])
    const [q, setQ] = useState("")
    const nav = useNavigate()
    const [user, dispatch] = useContext(MyUserContext)

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
            <Link className="nav-link text-danger" to="/login">&#128104; Đăng nhập</Link>
        </>
    )

    if (user !== null)
        userInfo = (
            <>
                <Link className="nav-link text-danger" to="/">
                    <img src={user.image} alt={user.username} width="30" className="rounded-circle" />
                    Chào {user.username}
                </Link>
                <Button className="btn btn-danger" onClick={logout}>&#128104; Đăng xuất</Button>
            </>
        )

    return (
        <>
        <Navbar bg="light" expand="lg">
            <Container>
                <Link to="/" className="navbar-brand">&#9997; e-Course Web</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link className="nav-link active" to="/">&#127968; Trang chủ</Link>
                    {categories.map(c => {
                        let url = `/?cateId=${c.id}`

                        return <Link className="nav-link" to={url} key={c.id}>{c.name}</Link>
                    })}
                    
                    {userInfo}
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