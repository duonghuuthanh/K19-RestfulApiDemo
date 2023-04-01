import { useEffect, useState } from "react"
import { Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import API, { endpoints } from "../configs/API"
import Items from "../layouts/Items"
import Loading from "../layouts/Loading"

const Lessons = () => {
    const [lessons, setLessons] = useState(null)
    const {courseId} = useParams()

    useEffect(() => {
        const loadLessons = async () => {
            let res = await API.get(endpoints['lessons'](courseId))
            setLessons(res.data)
        }

        loadLessons();
    }, [courseId])

    if (lessons === null)
        return <Loading />

    return (
        <>
            <h1 className="text-center text-info">DANH SÁCH BÀI HỌC</h1>
            <Row>
                {lessons.map(l => <Items key={l.id} obj={l} type="lesson" />)}
            </Row>
        </>
    )
}

export default Lessons