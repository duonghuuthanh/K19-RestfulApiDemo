import axios from "axios";

export const endpoints = {
    'categories': '/categories/',
    'courses': '/courses/',
    'lessons': (courseId) => `/courses/${courseId}/lessons/`,
    'lesson-detail': (lessonId) => `/lessons/${lessonId}/`
}

export default axios.create({
    baseURL: "http://thanhduong.pythonanywhere.com/"
})