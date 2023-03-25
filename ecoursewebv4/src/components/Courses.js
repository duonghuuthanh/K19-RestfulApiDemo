import { useEffect, useState } from "react"
import { Button, ButtonGroup, Card, Col, Container, Row, Spinner } from "react-bootstrap"
import API, { endpoints } from "../configs/API"

const Courses = () => {
    const [courses, setCourses] = useState(null)
    const [page, setPage] = useState(1)

    useEffect(() => {
        const loadCourses = async () => {
            try {
                let e = `${endpoints['courses']}?page=${page}`
                let res = await API.get(e)
                setCourses(res.data.results)
            } catch (ex) {
                setPage(1)
            }
        }

        loadCourses()
    }, [page])

    const nextPage = () => setPage(current => current + 1)
    const prevPage = () => setPage(current => current - 1)

    if (courses === null)
        return <Spinner animation="grow" variant="success" />

    return (
        <Container>
            <ButtonGroup aria-label="Basic example" className="mt-2">
                <Button onClick={prevPage} variant="outline-primary">&lt;&lt;</Button>
                <Button onClick={nextPage} variant="outline-primary">&gt;&gt;</Button>
            </ButtonGroup>
            <Row>
                {courses.map(c => {
                    return (
                        <Col md={3} xs={12} key={c.id} className="p-2">
                            <Card>
                                <Card.Img variant="top" src={c.image} />
                                <Card.Body>
                                    <Card.Title>{c.subject}</Card.Title>
                                    <Button variant="primary">Xem chi tiết</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
                
            </Row>
        </Container>
    )
}

export default Courses