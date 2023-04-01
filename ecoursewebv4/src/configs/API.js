import axios from "axios";

export const endpoints = {
    "categories": "/categories/",
    "courses": "/courses/",
    "lessons": (courseId) => `/courses/${courseId}/lessons/`,
    "lesson-details": (lessonId) => `/lessons/${lessonId}/` 
}

export default axios.create({
    baseURL: "http://thanhduong.pythonanywhere.com/"
})