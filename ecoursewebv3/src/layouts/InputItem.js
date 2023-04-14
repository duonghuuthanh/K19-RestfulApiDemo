import React from "react"
import { Form } from "react-bootstrap"

const InputItem = React.forwardRef(({label, value, setValue, controlId, type}, ref) => {
    if (type === "file")
        return (
            <Form.Group className="mb-3" controlId={controlId}>
                <Form.Label>{label}</Form.Label>
                <Form.Control type="file" ref={ref} />
            </Form.Group>
        )
        
    return (
        <Form.Group className="mb-3" controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} value={value}
                        onChange={setValue} placeholder={label} />
        </Form.Group>
    )
})

export default InputItem