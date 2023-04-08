import axios from "axios";
import cookie from "react-cookies";

export const endpoints = {
    "categories": "/categories/",
    "courses": "/courses/",
    "lessons": (courseId) => `/courses/${courseId}/lessons/`,
    "lesson-details": (lessonId) => `/lessons/${lessonId}/`,
    "login": "/o/token/",
    "current-user": "/users/current-user/"
}

export const authAPI = () => axios.create({
    baseURL: "http://thanhduong.pythonanywhere.com/",
    headers: {
        "Authorization": `Bearer ${cookie.load("access-token")}`
    }
})

export default axios.create({
    baseURL: "http://thanhduong.pythonanywhere.com/"
})