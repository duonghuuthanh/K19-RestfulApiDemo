import axios from "axios"
import cookie from "react-cookies"

export const endpoinds = {
    'categories': '/categories/',
    'courses': '/courses/',
    'lessons': (courseId) => `/courses/${courseId}/lessons/`,
    'lesson-detail': (lessonId) => `/lessons/${lessonId}/`,
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'register': '/users/',
    'lesson-comments': (lessonId) => `/lessons/${lessonId}/comments/`,
    'like': (lessonId) => `/lessons/${lessonId}/like/`,
    'rating': (lessonId) => `/lessons/${lessonId}/rating/`,
}

export const authAPI = () => axios.create({
    baseURL: "http://thanhduong.pythonanywhere.com/",
    headers: {
        "Authorization": `Bearer ${cookie.load('access_token')}`
    }
})

export default axios.create({
    baseURL: "http://thanhduong.pythonanywhere.com/"
})