import axios from "axios";
import cookie from "react-cookies";

export const endpoints = {
    "categories": "/categories/",
    "courses": "/courses/",
    "lessons": (coursesId) => `/courses/${coursesId}/lessons/`,
    "lesson-details": (lessonId) => `/lessons/${lessonId}/`,
    "login": "/o/token/",
    "current-user": "/users/current-user/",
    "register": "/users/",
    "lesson-comments": (lessonId) => `/lessons/${lessonId}/comments/`,
    "lesson-like": (lessonId) => `/lessons/${lessonId}/like/`,
    "lesson-rating": (lessonId) => `/lessons/${lessonId}/rating/`,
}

export const authAPI = () => axios.create({
    baseURL: "http://thanhduong.pythonanywhere.com/",
    headers: {
        "Authorization": `Bearer ${cookie.load('access-token')}`
    }
})

export default axios.create({
    baseURL: "http://thanhduong.pythonanywhere.com/"
})