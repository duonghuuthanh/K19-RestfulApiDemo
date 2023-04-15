import { useRef, useState } from "react"
import { Button, Form } from "react-bootstrap"
import InputItem from "../layouts/InputItem"
import Loading from "../layouts/Loading"
import API, { endpoints } from "../configs/API"
import ErrorAlert from "../layouts/ErrorAlert"
import { useNavigate } from "react-router-dom"

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
                    setErr("Hệ thống đang có lỗi! Vui lòng quay lại sau!")
            } catch (ex) {
                let msg = ""
                for (let e of Object.values(ex.response.data))
                    msg += `${e} `

                setErr(msg)
            } finally {
                setLoading(false)
            }
        }

        if (user.username === "" || user.password === "") 
            setErr("Username và password không được rỗng!")
        else if (user.password !== user.confirmPassword)
            setErr("Mật khẩu không khớp!")
        else {
            setLoading(true)
            process()
        }
    }

    const setValue = e => {
        const { name, value } = e.target
        setUser(current => ({...current, [name]:value}))
    }

    return (
        <>
            <h1 className="text-center text-success">ĐĂNG KÝ NGƯỜI DÙNG</h1>

            {err?<ErrorAlert err={err} />:""}

            <Form onSubmit={register}>
                <InputItem label="Tên người dùng" type="text" value={user.firstName} 
                            name="firstName" setValue={setValue} />
                <InputItem label="Họ và tên lót" type="text" value={user.lastName} 
                             name="lastName" setValue={setValue} />
                <InputItem label="Tên đăng nhập" type="text" value={user.username}
                             name="username" setValue={setValue} />
                <InputItem label="Mật khẩu" type="password" value={user.password} 
                             name="password" setValue={setValue} />
                <InputItem label="Xác nhận mật khẩu" type="password" value={user.confirmPassword} 
                             name="confirmPassword" setValue={setValue} />
                <InputItem label="Ảnh đại diện" type="file" ref={avatar} name="avatar" />
               
                {loading?<Loading />:<Button variant="primary" type="submit">Đăng ký</Button>}
            </Form>
        </>
    )
}

export default Register