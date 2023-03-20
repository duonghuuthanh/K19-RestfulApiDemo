import { useEffect, useState } from "react"
import { Card, Col, Container, Row, Button, ButtonGroup } from "react-bootstrap"
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
            <ButtonGroup aria-label="paging" style={{paddingTop: '0.5rem'}}>
                <Button onClick={prevPage} variant="primary">&lt;&lt;</Button>
                <Button onClick={nextPage} variant="success">&gt;&gt;</Button>
            </ButtonGroup>
            <Row>
                {courses.map(c => {
                    return (
                        <Col md={3} xs={12} style={{padding: '0.5rem'}}>
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