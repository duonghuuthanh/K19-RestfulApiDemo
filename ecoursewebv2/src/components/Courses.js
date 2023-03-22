import { useEffect, useState } from "react"
import { Button, ButtonGroup, Card, Col, Container, Row } from "react-bootstrap"
import API, { endpoints } from "../configs/API"

const Courses = () => {
    const [courses, setCourses] = useState([])
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
    const prevPage = () => setPage(current => current-1)

    return (
        <Container>
            <ButtonGroup aria-label="paging" className="p-1">
                <Button onClick={prevPage} variant="outline-secondary">&#11013;</Button>
                <Button onClick={nextPage} variant="outline-secondary">&#10145;</Button>
            </ButtonGroup>
            <Row>
                {courses.map(c => {
                    return (
                    <Col md={3} xs={12} className='p-2'>
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