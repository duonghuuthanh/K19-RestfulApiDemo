import { useContext, useEffect, useState } from "react"
import { Badge, Button, Col, Form, Image, Row } from "react-bootstrap"
import Moment from "react-moment"
import Rating from "react-rating"
import { Link, useParams } from "react-router-dom"
import API, { authAPI, endpoints } from "../configs/API"
import { UserContext } from "../configs/MyContext"
import Loading from "../layouts/Loading"

const LessonDetails = () => {
    const [lesson, setLesson] = useState(null)
    const [comments, setComments] = useState(null)
    const {lessonId} = useParams()
    const [user, ] = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState("")

    useEffect(() => {
        let loadLesson = async () => {
            let res = await authAPI().get(endpoints['lesson-details'](lessonId))
            console.info(res.data)
            setLesson(res.data)
        }

        loadLesson()
    }, [lessonId])

    useEffect(() => {
        const loadComments = async () => {
            let res = await API.get(endpoints['lesson-comments'](lessonId))
            setComments(res.data)
        }

        loadComments()
    }, [])

    const addComment = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let res = await authAPI().post(endpoints['lesson-comments'](lessonId), {
                    "content": content
                })
                setComments(curr => ([res.data, ...curr]))
                setContent("")
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
            let res = await authAPI().post(endpoints['lesson-like'](lessonId))
            setLesson(res.data)
        }

        process()
    }

    const rating = (r) => {
        const process = async () => {
            let res = await authAPI().post(endpoints['lesson-rating'](lessonId), {
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
                <img width="200" alt="lesson.subject" src={lesson.image} />
                {user===null?"":(
                     <div>
                        <Button className="mt-1" onClick={like} type="submit" variant={lesson.liked===true?"danger":"outline-danger"}>Like</Button>
                        <div>
                            <Rating initialRating={lesson.rate} onClick={rating} />
                        </div>
                    </div>
                )}
               
                <div>
                    {lesson.tags.map(t => <Badge key={t.id} bg="primary" className="m-1">{t.name}</Badge>)}
                </div>
            </div> 
            <p dangerouslySetInnerHTML={{__html: lesson.content}}></p>

            <hr></hr>

            {user===null?<Link to="/login">Đăng nhập</Link>:(
                <Form onSubmit={addComment}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows={3} 
                                value={content} required
                                onChange={e => setContent(e.target.value)}
                                placeholder="Nội dung bình luận..." />
                        {loading?<Loading />:<Button className="mt-1" variant="primary" type="submit">Bình luận</Button>}
                    </Form.Group>
                </Form>
            )}
            

            <hr></hr>

            {comments===null?<Loading />:(
                comments.map(c => {
                    return (
                        <Row className="bg-light m-1">
                            <Col md={1} xs={3}>
                                <Image src={c.user.image} alt={c.user.username} rounded fluid />
                            </Col>
                            <Col md={11} xs={9}>
                                <p>{c.content}</p>
                                <small>Binh luan boi <Link>{c.user.username}</Link> luc <Moment fromNow>{c.created_date}</Moment></small>
                            </Col>
                        </Row>
                    )
                })
            )}
        </>
    )
}

export default LessonDetails