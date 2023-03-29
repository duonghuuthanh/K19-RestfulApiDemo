import axios from "axios";

export const endpoints = {
    "categories": "/categories/",
    "courses": "/courses/",
    "lessons": (coursesId) => `/courses/${coursesId}/lessons/`,
    "lesson-details": (lessonId) => `/lessons/${lessonId}/`     
}

export default axios.create({
    baseURL: "http://thanhduong.pythonanywhere.com/"
})