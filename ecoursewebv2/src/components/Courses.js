import { useEffect, useState } from "react"
import { Button, ButtonGroup, Row } from "react-bootstrap"
import { useSearchParams } from "react-router-dom"
import API, { endpoints } from "../configs/API"
import Items from "../layouts/Items"
import Loading from "../layouts/Loading"

const Courses = () => {
    const [courses, setCourses] = useState(null)
    const [page, setPage] = useState(1)
    const [q] = useSearchParams("")

    useEffect(() => {
        const loadCourses = async () => {
            try {
                let e = `${endpoints['courses']}?page=${page}`

                let kw = q.get('q')
                if (kw !== null)
                    e += `&q=${kw}`

                let cateId = q.get('cateId')
                if (cateId !== null)
                    e += `&category_id=${cateId}`

                let res = await API.get(e)
                setCourses(res.data.results)
            } catch (ex) {
                setPage(1)
            }
        }

        setCourses(null)
        loadCourses()
    }, [page, q])

    const nextPage = () => setPage(current => current + 1)
    const prevPage = () => setPage(current => current-1)

    if (courses === null)
        return <Loading />

    if (courses.length === 0)
        return <div className="alert alert-info mt-1">KHÔNG có khóa học nào!!!</div>

    return (
        <>
            <ButtonGroup aria-label="paging" className="p-1">
                <Button onClick={prevPage} variant="outline-secondary">&#11013;</Button>
                <Button onClick={nextPage} variant="outline-secondary">&#10145;</Button>
            </ButtonGroup>
            <Row>
                {courses.map(c => <Items key={c.id} obj={c} />)}
            </Row>
        </>
    )
}

export default Courses