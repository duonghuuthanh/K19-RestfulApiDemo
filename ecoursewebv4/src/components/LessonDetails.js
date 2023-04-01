import { useEffect, useState } from "react"
import { Badge } from "react-bootstrap"
import { useParams } from "react-router-dom"
import API, { endpoints } from "../configs/API"
import Loading from "../layouts/Loading"

const LessonDetails = () => {
    const [lesson, setLesson] = useState(null)
    const {lessonId} = useParams()

    useEffect(() => {
        const loadLesson = async () => {
            let res = await API.get(endpoints['lesson-details'](lessonId))
            setLesson(res.data)
        }

        loadLesson()
    }, [lessonId])

    if (lesson === null)
        return <Loading />

    return (
        <>
            <h1 className="text-center text-success">{lesson.subject}</h1>
            <div>
                <div>
                    <img src={lesson.image} width="200" alt={lesson.subject} />
                </div>
                {lesson.tags.map(t => <Badge className="m-1" bg="primary" key={t.id}>{t.name}</Badge>)}
            </div>
            <p dangerouslySetInnerHTML={{__html: lesson.content}}></p>
        </>
    )
}

export default LessonDetails