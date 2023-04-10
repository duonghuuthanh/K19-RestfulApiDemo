import axios from "axios"

export const endpoinds = {
    'categories': '/categories/',
    'courses': '/courses/',
    'lessons': (courseId) => `/courses/${courseId}/lessons/`,
    'lesson-detail': (lessonId) => `/lessons/${lessonId}/`,
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'register': '/users/'
}

export default axios.create({
    baseURL: "http://thanhduong.pythonanywhere.com/"
})