import { useContext, useEffect, useState } from "react"
import { Button, Col, Form, Image, Row } from "react-bootstrap"
import Moment from "react-moment"
import Rating from "react-rating"
import { Link, useParams } from "react-router-dom"
import API, { authAPI, endpoinds } from "../configs/API"
import { UserContext } from "../configs/MyContext"
import Loading from "../layouts/Loading"

const LessonDetails = () => {
    const [lesson, setLesson] = useState(null)
    const [comments, setComments] = useState(null)
    const [user, ] = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState("")
    const {lessonId} = useParams()

    useEffect(() => {
        const loadLesson = async () => {
            let res = await authAPI().get(endpoinds['lesson-detail'](lessonId))
            setLesson(res.data)
            console.info(res.data)
        }

        loadLesson()
    }, [lessonId])

    useEffect(() => {
        const loadComments = async () => {
            let res = await API.get(endpoinds['lesson-comments'](lessonId))
            setComments(res.data)
        }

        loadComments()
    }, [])

    const addComment = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let res = await authAPI().post(endpoinds['lesson-comments'](lessonId), {
                    'content': content
                })
                setComments(curr => ([res.data, ...curr]))
            } catch (ex) {
                console.info(ex)
            } finally {
                setLoading(false)
            }
        }

        setLoading(true)
        process()
    }

    const like = () => {
        const process = async () => {
            let res = await authAPI().post(endpoinds['like'](lessonId))
            setLesson(res.data)
        }

        process()
    }

    const rate = (r) => {
        const process = async () => {
            let res = await authAPI().post(endpoinds['rating'](lessonId), {
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
            <img src={lesson.image} width="200" alt={lesson.subject} />
            <div>
                <Button variant={lesson.liked===true?"success":"outline-success"} onClick={like}>Like</Button>
            </div>
            <Rating initialRating={lesson.rate} onClick={rate} />
            <p dangerouslySetInnerHTML={{__html:lesson.content}}></p>

            {user===null?<Link to="/login">Đăng nhập</Link>:(
                 <Form onSubmit={addComment}>
                    <Form.Group className="mb-3" controlId="content">
                        <Form.Control as="textarea" 
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            rows={3} placeholder="Nội dung bình luận..." />
                    </Form.Group>
                    {loading?<Loading />:<Button type="submit" variant="primary">Bình luận</Button>}
                </Form>
            )}

            <hr></hr>

            {comments===null?<Loading />:(
                comments.map(c => {
                    return (
                        <Row className="bg-light m-1">
                            <Col md={1} xs={3}>
                                <Image src={c.user.image} alt={c.user.username} fluid rounded />
                            </Col>
                            <Col md={11} xs={9}>
                                <p>{c.content}</p>
                                <small>Binh luan boi {c.user.username} luc <Moment fromNow>{c.created_date}</Moment></small>
                            </Col>
                        </Row>
                    )
                })
                
            )}

        </>    
    )
}

export default LessonDetails