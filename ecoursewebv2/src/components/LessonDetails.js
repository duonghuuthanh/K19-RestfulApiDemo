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
            let res = await API.get(endpoints['lesson-details'](lessonId))
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
                <img width="200" src={lesson.image} />
                <div>
                    {lesson.tags.map(t => <Badge key={t.id} bg="primary" className="m-1">{t.name}</Badge>)}
                </div>
            </div> 
            <p dangerouslySetInnerHTML={{__html: lesson.content}}></p>
        </>
    )
}

export default LessonDetails