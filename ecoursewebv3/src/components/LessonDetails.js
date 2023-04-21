import { useContext, useEffect, useState } from "react"
import { Badge, Button, Col, Form, Row } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import API, { authAPI, endpoints } from "../configs/API"
import Loading from "../layouts/Loading"
import { UserContext } from "../configs/MyContext"
import Moment from "react-moment"
import Rating from "react-rating"

const LessonDetails = () => {
    const [lesson, setLesson] = useState(null)
    const [comments, setComments] = useState(null)
    const {lessonId} = useParams()
    const [user, ] = useContext(UserContext)
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let loadLesson = async () => {
            let res = await authAPI().get(endpoints["lesson-detail"](lessonId))
            console.info(res.data)
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

    const addComment = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let res = await authAPI().post(endpoints['comments'](lessonId), {
                    'content': content
                })

                setComments(curr => [res.data, ...curr])
            } catch {

            } finally {
                setLoading(false)
            }
        }

        setLoading(true)
        process()
    }

    const like = () => {
        const process = async () => {
            let res = await authAPI().post(endpoints['like'](lessonId))
            setLesson(res.data)
        }

        process()
    }

    const rate = (r) => {
        const process = async () => {
            let res = await authAPI().post(endpoints['rate'](lessonId), {
                'rating': r
            })
            setLesson(res.data)
        }

        process()
    }

    if (lesson === null)
        return <Loading />

    return (
        <>
            <h1 className="text-center text-success">{lesson.subject}</h1>
            <div>
                <img src={lesson.image} width="200" />
                {user===null?"": (
                    <div className="mt-1">
                        <Button type="submit" onClick={like} variant={lesson.liked===true?"danger":"outline-danger"}>Like</Button>
                        <p>
                            <Rating initialRating={lesson.rate} onClick={rate} />
                        </p>
                    </div>
                )}
                
                <div>
                    {lesson.tags.map(t => <Badge bg="info" key={t.id} className="m-1">{t.name}</Badge>)}
                </div>
            </div>
            <p dangerouslySetInnerHTML={{__html: lesson.content}}></p>
            
            <hr></hr>
            {user===null?<Link to="/login">Đăng nhập</Link>:(
                <Form onSubmit={addComment}>
                    <Form.Group className="mb-3" controlId="comment-content">
                        <Form.Control as="textarea" rows={3} 
                            value={content} required
                            onChange={e => setContent(e.target.value)}
                            placeholder="Nội dung bình luận..." />
                    </Form.Group>
                    {loading===true?<Loading />:<Button type="submit">Bình luận</Button>}
                </Form>
            )}
            <hr></hr>

            {comments === null?<Loading />:
                comments.map(c => (
                    <Row className="bg-light m-1 p-2">
                        <Col md={1} xs={3}>
                            <img src={c.user.image} alt={c.user.username} className="img-fluid rounded-circle" />
                        </Col>
                        <Col md={11} xs={9}>
                            <p>{c.content}</p>

                            <small>Binh luan boi {c.user.username} luc <Moment fromNow>{c.created_date}</Moment></small>
                        </Col>
                    </Row>
                ))
            }
            
        </>
    )
}

export default LessonDetails