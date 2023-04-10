import { memo, useCallback, useReducer, useRef, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import API, { endpoinds } from "../configs/API"
import Loading from "../layouts/Loading"

const Register = () => {
    const [user, setUser] = useState({
        "firstName": "",
        "lastName": "",
        "username": "",
        "password": "",
        "confirmPassword": ""
    })
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")
    const avatar = useRef()
    const nav = useNavigate()

    const register = (evt) => {
        evt.preventDefault()

        const process = async () => {
            let form = new FormData()
            form.append("first_name", user.firstName)
            form.append("last_name", user.lastName)
            form.append("username", user.username)
            form.append("password", user.password)
            form.append("avatar", avatar.current.files[0])

            try {
                let res = await API.post(endpoinds['register'], form, {
                    headers: {
                        "Content-Type": "multiple/form-data"
                    }
                })
    
                if (res.status === 201)
                    nav("/login")
            } catch(ex) {
                let e = ""
                for (let d of Object.values(ex.response.data))
                    e += `${d} <br />`
                setErr(e)
            } finally {
                setLoading(false)
            }
            
        }

        if (user.username === "" || user.password == "")
            setErr("Username và password bắt buộc nhập!")
        else if (user.password !== user.confirmPassword)
            setErr("Mật khẩu không khớp!")
        else {
            setLoading(true)
            process()
        }
    }

    const setValue = (value, key) => {
        setUser({...user, [key]: value})
    }

    return (
        <>
        <h1 className="text-center text-info">ĐĂNG KÝ NGƯỜI DÙNG</h1>

        {err?<div className="alert alert-danger" dangerouslySetInnerHTML={{__html: err}}></div>:""}

        <Form onSubmit={register}>
            <InputItem label="Tên người dùng" controlId="first_name" 
                        value={user.firstName} type="text"
                        setValue={e => setValue(e.target.value, "firstName")} />

            <InputItem label="Họ và chữ lót" controlId="last_name" 
                        value={user.lastName} type="text"
                        setValue={e => setValue(e.target.value, "lastName")} />
            
            <InputItem label="Tên đăng nhập" controlId="username" 
                        value={user.username} type="text"
                        setValue={e => setValue(e.target.value, "username")} />
            
            <InputItem label="Mật khẩu" controlId="password" 
                        value={user.password} type="password"
                        setValue={e => setValue(e.target.value, "password")} />
            
            <InputItem label="Xác nhận mật khẩu" controlId="confirm" 
                        value={user.confirmPassword} type="password"
                        setValue={e => setValue(e.target.value, "confirmPassword")} />

            <Form.Group className="mb-3" controlId="avatar">
                <Form.Label>Ảnh đại diện</Form.Label>
                <Form.Control type="file" ref={avatar} />
            </Form.Group>
            
            {loading? <Loading />:<Button type="submit" variant="primary">Đăng ký</Button>}
        </Form>
        </>
    )
}

const InputItem = memo(({label, value, setValue, controlId, type}) => {
    return (
        <>
            <Form.Group className="mb-3" controlId={controlId}>
                <Form.Label>{label}</Form.Label>
                <Form.Control type={type} value={value} onChange={setValue} placeholder={label} />
            </Form.Group>
        </>
    )
})

export default Register