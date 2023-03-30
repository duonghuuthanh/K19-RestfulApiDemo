import { useEffect, useState } from "react"
import { Badge } from "react-bootstrap"
import { useParams } from "react-router-dom"
import API, { endpoints } from "../configs/API"
import Loading from "../layouts/Loading"

const LessonDetails = () => {
    const [lesson, setLesson] = useState(null)
    const {lessonId} = useParams()

    useEffect(() => {
        let loadLesson = async () => {
            let res = await API.get(endpoints["lesson-detail"](lessonId))
            setLesson(res.data)
        }

        loadLesson()
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
        </>
    )
}

export default LessonDetails