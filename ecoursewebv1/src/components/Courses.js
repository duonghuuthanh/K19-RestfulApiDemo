import { useEffect, useState } from "react"
import { Row, Button, ButtonGroup } from "react-bootstrap"
import { useSearchParams } from "react-router-dom"
import API, { endpoinds } from "../configs/API"
import Item from "../layouts/Item"
import Loading from "../layouts/Loading"

const Courses = () => {
    const [courses, setCourses] = useState(null)
    const [page, setPage] = useState(1)
    const [q] = useSearchParams()

    useEffect(() => {
        const loadCourses = async () => {
            let endpoint = `${endpoinds['courses']}?page=${page}`

            let kw = q.get("kw")
            if (kw !== null)
                endpoint += `&q=${kw}`

            let cateId = q.get("category_id")
            if (cateId !== null)
                endpoint += `&category_id=${cateId}`

            try {
                let res = await API.get(endpoint)
                setCourses(res.data.results)
            } catch (ex) {
                setPage(1)
            }
        }

        setCourses(null)
        loadCourses()
    }, [page, q])

    const nextPage = () => {
        setPage(current => current + 1)
    }

    const prevPage = () => {
        setPage(current => current -1)
    }

    if (courses === null)
        return <Loading />
    
    if (courses.length === 0)
        return <div className="alert alert-info m-1">Không có khóa học nào!</div>

    return (
        <>
            <ButtonGroup aria-label="paging" className="m-1">
                <Button onClick={prevPage} variant="primary">&lt;&lt;</Button>
                <Button onClick={nextPage} variant="success">&gt;&gt;</Button>
            </ButtonGroup>
            <Row>
                {courses.map(c => <Item obj={c} />)}
            </Row>
        </>
    )
}

export default Courses