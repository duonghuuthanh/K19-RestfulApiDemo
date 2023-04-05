import { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import cookie from "react-cookies"
import { Navigate } from "react-router-dom"
import API, { authAPI, endpoints } from "../configs/API"
import { UserContext } from "../configs/MyContext"
import Loading from "../layouts/Loading"

const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState([])
    const [user, dispatch] = useContext(UserContext)


    const login = (evt) => {
        evt.preventDefault()

        const process = async () => {
         
            try {
                let res = await API.post(endpoints['login'], {
                    'username': username,
                    'password': password,
                    'client_id': 'Vbe8euZZQJoWJ2UzW9wDThg4hJEZHHbhFmnfj7UR',
                    'client_secret': 'cVm4w4hSdy4MtwbP4KuNgXkGPeQJ9yrQdBvXHGR6b3e97F2bYqQ81XJ49FEufzjcw4SKwpuOZQiCLsNelHY1MkuYTGBRcSqtWmSlebSUk27WfyDskCB2VeCQihnEKdZ2',
                    'grant_type': 'password'
                })
    
                cookie.save("access-token", res.data.access_token)
    
                let user = await authAPI().get(endpoints['current-user'])
                cookie.save("current-user", user.data)
    
                dispatch({
                    "type": "login",
                    "payload": user.data
                })
            } catch (ex) {
                setError('Username hoặc password không chính xác!')
            } finally {
                setLoading(false)
            }
            
            
        }


        
        if (username === "" || username === undefined || password === "" || password === undefined) {
            setError("username hoac password không được rỗng!")
        } else {
            setLoading(true)
            process()
        }
    }
    if (user !== null)
        return <Navigate to="/" />

    let err = <div className="alert alert-danger">{error}</div>

    return (
        <>
            <h1 className="text-center text-success">ĐĂNG NHẬP NGƯỜI DÙNG</h1>

            {error !== undefined ?err:""}

            <Form onSubmit={login}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control type="text" value={username}
                                  onChange={e => setUsername(e.target.value)}
                                  placeholder="Tên đăng nhâp..." />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type="password" value={password}
                                  onChange={e => setPassword(e.target.value)}
                                  placeholder="Mật khẩu..." />
                </Form.Group>
                {loading?<Loading />:<Button variant="primary" type="submit">Đăng nhập</Button>}
            </Form>
        </>
    )
}

export default Login