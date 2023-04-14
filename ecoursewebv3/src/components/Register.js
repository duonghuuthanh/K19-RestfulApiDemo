import { useRef, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import API, { endpoints } from "../configs/API"
import InputItem from "../layouts/InputItem"
import Loading from "../layouts/Loading"

const Register = () => {
    const [user, setUser] = useState({
        "firstName": "",
        "lastName": "",
        "username": "",
        "password": "",
        "confirmPassword": ""
    })
    const avatar = useRef()
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")
    const nav = useNavigate()

    const register = (evt) => {
        evt.preventDefault()

        const process = async () => {

            try {
                let form = new FormData()
                form.append("first_name", user.firstName)
                form.append("last_name", user.lastName)
                form.append("username", user.username)
                form.append("password", user.password)
                if (avatar.current.files.length > 0)
                    form.append("avatar", avatar.current.files[0])
    
                let res = await API.post(endpoints['register'], form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                if (res.status === 201)
                    nav("/login")
                else
                    setErr("Hệ thống đang bị lỗi! Vui lòng quay lại sau!")
            } catch {
                setErr("Username đã tồn tại!")
            } finally {
                setLoading(false)
            }
        }

        if (user.username === "" || user.password === "")
            setErr("Username hoặc password không được rỗng!");
        else if (user.password !== user.confirmPassword)
            setErr("Mật khẩu không khớp!")
        else {
            setLoading(true)
            process()
        }
    }

    return (
        <>
            <h1 className="text-center text-success">ĐĂNG KÝ NGƯỜI DÙNG</h1>

            {err?<div className="alert alert-danger">{err}</div>:""}

            <Form onSubmit={register}>
                <InputItem label="Tên người dùng" value={user.firstName} controlId="firstName" type="text"
                        setValue={(e) => setUser({...user, "firstName": e.target.value})}  />
                <InputItem label="Họ và chữ lót" value={user.lastName} controlId="lastName"  type="text"
                        setValue={(e) => setUser({...user, "lastName": e.target.value})}  />
                <InputItem label="Tên đăng nhập" value={user.username} controlId="username"  type="text"
                        setValue={(e) => setUser({...user, "username": e.target.value})}  />
                <InputItem label="Mật khẩu" value={user.password} controlId="password"  type="password"
                        setValue={(e) => setUser({...user, "password": e.target.value})}  />
                <InputItem label="Xác nhận mật khẩu" value={user.confirmPassword} controlId="confirmPassword" type="password"
                        setValue={(e) => setUser({...user, "confirmPassword": e.target.value})}  />
                <InputItem label="Ảnh đại diện"  controlId="avatar" type="file" ref={avatar}  />

                {loading?<Loading />:<Button variant="primary" type="submit">Đăng ký</Button>}
            </Form>
        </>
    )
}

export default Register