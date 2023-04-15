import { useContext, useEffect, useState } from "react"
import { Badge, Button, Col, Form, Image, Row } from "react-bootstrap"
import Moment from "react-moment"
import Rating from "react-rating"
import { Link, useParams } from "react-router-dom"
import API, { authAPI, endpoints } from "../configs/API"
import { MyUserContext } from "../configs/MyContext"
import Loading from "../layouts/Loading"

const LessonDetails = () => {
    const [lesson, setLesson] = useState(null)
    const [comments, setComments] = useState(null)
    const {lessonId} = useParams()
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState("")
    const [user, ] = useContext(MyUserContext)

    useEffect(() => {
        const loadLesson = async () => {
            let res = await authAPI().get(endpoints['lesson-details'](lessonId))
            console.info(res.data)
            setLesson(res.data)
        }

        loadLesson()
    }, [lessonId])

    useEffect(() => {
        const loadComments = async () => {
            let res = await API.get(endpoints['comments'](lessonId))
            setComments(res.data)
        }

        loadComments()
    }, [lessonId])

    const addComment = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let res = await authAPI().post(endpoints['comments'](lessonId), {
                    "content": content
                })
                setComments(current => ([res.data, ...current]))
            } catch {

            } finally {
                setLoading(false)
            }
            
        }

        setLoading(true)
        process()
    }

    const likeProcess = () => {
        const process = async () => {
            try {
                let res = await authAPI().post(endpoints['like-lesson'](lessonId))
                if (res.status === 201)
                    setLesson(res.data)
            } catch (ex) {
                console.error(ex)
            }
        }
        
        process()
    }

    const rating = (r) => {
        const process = async () => {
            try {
                let res = await authAPI().post(endpoints['rating-lesson'](lessonId), {
                    'rating': r
                })
                if (res.status === 201)
                    setLesson(res.data)
            } catch (ex) {
                console.error(ex)
            }
        }
        
        process()
    }

    if (lesson === null)
        return <Loading />

    return (
        <>
            <h1 className="text-center text-success">{lesson.subject}</h1>
            <div>
                <div>
                    <img src={lesson.image} width="300" alt={lesson.subject} />
                    <div className="mt-1"><button type="button" onClick={likeProcess} class={lesson.liked===true?"btn btn-danger":"btn btn-outline-danger"} style={{fontSize:"16px"}}>♡</button></div>
                    <Rating onClick={rating} initialRating={lesson.rate?lesson.rate:0}  />
                </div>

                {lesson.tags.map(t => <Badge className="m-1" bg="primary" key={t.id}>{t.name}</Badge>)}
            </div>
            <p dangerouslySetInnerHTML={{__html: lesson.content}}></p>

            <hr></hr>
            {user===null?<Link to="/login">Đăng nhập</Link>: (
                <Form onSubmit={addComment}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control value={content} onChange={e => setContent(e.target.value)} as="textarea" rows={3} placeholder="Nội dung bình luận..." />
                    </Form.Group>
                    {loading?<Loading />:<Button variant="primary" type="submit">Bình luận</Button>}
                </Form>
            )}
            
            <hr></hr>

            {comments===null?<Loading />: (
                comments.map(c => (
                    <Row className="bg-light m-1 p-1">
                        <Col xs={3} md={1}>
                            <Image src={c.user.image} alt={c.user.username} rounded fluid />
                        </Col>
                        <Col xs={9} md={11}>
                            <p>{c.content}</p>
                            <small>Được bình luận {c.user.username} vào <Moment fromNow>{c.created_date}</Moment> </small>
                        </Col>
                    </Row>
                ))
            )}

            
        </>
    )
}

export default LessonDetails