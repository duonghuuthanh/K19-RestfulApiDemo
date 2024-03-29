import { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import cookie from "react-cookies"
import { Navigate } from "react-router-dom"
import API, { authAPI, endpoints } from "../configs/API"
import { MyUserContext } from "../configs/MyContext"
import ErrorAlert from "../layouts/ErrorAlert"
import InputItem from "../layouts/InputItem"
import Loading from "../layouts/Loading"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState()
    const [user, dispatch] = useContext(MyUserContext)

    const login = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let res = await API.post(endpoints['login'], {
                    "username": username,
                    "password": password,
                    "client_id": "Vbe8euZZQJoWJ2UzW9wDThg4hJEZHHbhFmnfj7UR",
                    "client_secret": "cVm4w4hSdy4MtwbP4KuNgXkGPeQJ9yrQdBvXHGR6b3e97F2bYqQ81XJ49FEufzjcw4SKwpuOZQiCLsNelHY1MkuYTGBRcSqtWmSlebSUk27WfyDskCB2VeCQihnEKdZ2",
                    "grant_type": "password"
                })
    
                cookie.save('access-token', res.data.access_token)
    
                let user = await authAPI().get(endpoints['current-user'])
                cookie.save('current-user', user.data)
    
                dispatch({
                    "type": "login", 
                    "payload": user.data
                })
            } catch (ex) {
                console.error(ex)
                setErr('Username hoặc Password không hợp lệ!')
            } finally {
                setLoading(false)
            }
        }

        if (username === "" || password === "")
            setErr("Phải nhập username và password!")
        else {
            setLoading(true)
            process()
        }
    }

    if (user !== null)
        return <Navigate to="/" />

    return (
        <>
            <h1 className="text-center text-success">ĐĂNG NHẬP NGƯỜI DÙNG</h1>

            {err?<ErrorAlert err={err} />:""}
            

            <Form onSubmit={login}>
                <InputItem label="Tên đăng nhập" type="text" value={username} setValue={e => setUsername(e.target.value)} />
                <InputItem label="Mật khẩu" type="password" value={password} setValue={e => setPassword(e.target.value)} />
                
                {loading?<Loading />:<Button variant="primary" type="submit">Đăng nhập</Button>}
            </Form>
        </>
    )
}

export default Login