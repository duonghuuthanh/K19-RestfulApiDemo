import { useEffect, useState } from "react"
import { Card, Col, Container, Row, Button } from "react-bootstrap"
import API, { endpoinds } from "../configs/API"

const Courses = () => {
    const [courses, setCourses] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        const loadCourses = async () => {
            let res = await API.get(`${endpoinds['courses']}?page=${page}`)
            setCourses(res.data.results)
        }

        loadCourses()
    }, [page])

    const nextPage = () => {
        setPage(current => current + 1)
    }

    const prevPage = () => {
        setPage(current => current -1)
    }

    return (
        <>
        
        <Container>
            <Button onClick={prevPage}>&lt;&lt;</Button>
            <Button onClick={nextPage}>&gt;&gt;</Button>
            <Row>
                {courses.map(c => {
                    return (
                        <Col md={3} xs={12}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={c.image} />
                                <Card.Body>
                                    <Card.Title>{c.subject}</Card.Title>
                                </Card.Body>
                                <Card.Body>
                                    <Button>Xem các bài học</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>
        </>
    )
}

export default Courses