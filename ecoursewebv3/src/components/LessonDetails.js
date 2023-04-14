import { useEffect, useState } from "react"
import { Badge, Button, Col, Form, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import API, { endpoints } from "../configs/API"
import Loading from "../layouts/Loading"

const LessonDetails = () => {
    const [lesson, setLesson] = useState(null)
    const [comments, setComments] = useState(null)
    const {lessonId} = useParams()

    useEffect(() => {
        let loadLesson = async () => {
            let res = await API.get(endpoints["lesson-detail"](lessonId))
            setLesson(res.data)
        }

        loadLesson()
    }, [])

    useEffect(() => {
        let loadComments = async () => {
            let res = await API.get(endpoints['comments'](lessonId))
            setComments(res.data)
        }

        loadComments()
    }, [])

    if (lesson === null)
        return <Loading />

    return (
        <>
            <h1 className="text-center text-success">{lesson.subject}</h1>
            <div>
                <img src={lesson.image} width="200" />
                <div>
                    {lesson.tags.map(t => <Badge bg="info" key={t.id} className="m-1">{t.name}</Badge>)}
                </div>
            </div>
            <p dangerouslySetInnerHTML={{__html: lesson.content}}></p>
            
            <hr></hr>
            <Form>
                <Form.Group className="mb-3" controlId="comment-content">
                    <Form.Label>Nội dung bình luận</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Button>Bình luận</Button>
            </Form>
            <hr></hr>

            {comments === null?<Loading />:
                comments.map(c => (
                    <Row className="bg-warning m-1 p-2">
                        <Col md={1} xs={3}>
                            <img src={c.user.image} alt={c.user.username} className="img-fluid rounded-circle" />
                        </Col>
                        <Col md={11} xs={9}>
                            <p>{c.content}</p>

                            <small>Binh luan boi {c.user.username} luc {c.created_date}</small>
                        </Col>
                    </Row>
                ))
            }
            
        </>
    )
}

export default LessonDetails