import { useEffect, useState } from "react"
import { Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import API, { endpoinds } from "../configs/API"
import Item from "../layouts/Item"
import Loading from "../layouts/Loading"

const Lessons = () => {
    const [lessons, setLessons] = useState(null)
    const {courseId} = useParams()

    useEffect(() => {
        const loadLessons = async () => {
            let res = await API.get(endpoinds['lessons'](courseId))
            setLessons(res.data)
        }

        loadLessons()
    }, [])

    if (lessons === null)
        return <Loading />

    return (
        <>
            <h1 className="text-center text-info">DANH SÁCH BÀI HỌC CỦA KHÓA HỌC {courseId}</h1>
            <Row>
                {lessons.map(l => <Item type="lesson" obj={l} />)}
            </Row>
        </>
    )
}

export default Lessons