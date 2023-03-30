import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const Items = ({obj, type}) => {
    let url = `/courses/${obj.id}/lessons`
    if (type === 'lesson')
        url = `/lessons/${obj.id}`

    return (
        <Col md={3} xs={12} className="p-2">
            <Card>
                <Card.Img variant="top" src={obj.image} />
                <Card.Body>
                    <Card.Title>{obj.subject}</Card.Title>
                    <Link to={url} className="btn btn-primary">Xem chi tiết</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Items