import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API, { endpoinds } from "../configs/API"
import Loading from "../layouts/Loading"

const LessonDetails = () => {
    const [lesson, setLesson] = useState(null)
    const {lessonId} = useParams()

    useEffect(() => {
        const loadLesson = async () => {
            let res = await API.get(endpoinds['lesson-detail'](lessonId))
            setLesson(res.data)
        }

        loadLesson()
    }, [lessonId])

    if (lesson === null)
        return <Loading /> 

    return (
        <>
            <h1 className="text-center text-success">{lesson.subject}</h1>
            <img src={lesson.image} width="200" alt={lesson.subject} />
            <p dangerouslySetInnerHTML={{__html:lesson.content}}></p>
        </>    
    )
}

export default LessonDetails