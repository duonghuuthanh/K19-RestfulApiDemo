import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const Item = ({type, obj}) => {
    let url =  `/courses/${obj.id}/lessons`
    if (type === 'lesson')
        url = `/lessons/${obj.id}`
        
    return (

        <Col md={3} xs={12} style={{padding: '0.5rem'}}>
            <Card>
                <Card.Img variant="top" src={obj.image} />
                <Card.Body>
                    <Card.Title>{obj.subject}</Card.Title>
                </Card.Body>
                <Card.Body>
                    <Link className="btn btn-info" to={url}>Xem chi tiết</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Item