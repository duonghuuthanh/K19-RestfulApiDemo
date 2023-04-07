import { useEffect, useState } from "react"
import { Button, ButtonGroup, Row } from "react-bootstrap"
import { useSearchParams } from "react-router-dom"
import API, { endpoints } from "../configs/API"
import Items from "../layouts/Items"
import Loading from "../layouts/Loading"

const Courses = () => {
    const [courses, setCourses] = useState(null)
    const [page, setPage] = useState(1)
    const [q] = useSearchParams()

    useEffect(() => {
        const loadCourses = async () => {
            try {
                let e = `${endpoints['courses']}?page=${page}`

                let k = q.get("q")
                if (k !== null)
                    e += `&q=${k}`

                let c = q.get("cateId")
                if (c !== null)
                    e += `&category_id=${c}`

                let res = await API.get(e)
                setCourses(res.data.results)
            } catch(ex) {
                setPage(1)
            }
        }

        setCourses(null)
        loadCourses()
    }, [page, q])

    const nextPage = () => setPage(current => current + 1)
    const prevPage = () => setPage(current => current - 1)

    if (courses === null)
        return <Loading />

    if (courses.length === 0)
        return <div className="alert alert-info m-1">KHÔNG có khóa học nào!!!</div>

    return (
        <>
            <ButtonGroup aria-label="Paginator" className="p-2">
                <Button onClick={prevPage} variant="outline-primary">&lt;&lt;</Button>
                <Button onClick={nextPage} variant="outline-primary">&gt;&gt;</Button>
            </ButtonGroup>
            <Row>
                {courses.map(c => {
                    return <Items key={c.id} obj={c} />
                })}
            </Row>
        </>
    )
}

export default Courses