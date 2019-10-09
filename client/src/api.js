import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:5001/api'
});

export const createCourse = course => instance.post("/courses", course);
export const getCourse = id => instance.get(`/courses/${id}`);
export const createComment = comment => instance.post("/comments", comment);
export const getComments = payload => instance.get(`/comments?userId=${payload.userId}&courseId=${payload.courseId}`)
export const login = payload => instance.post("/login", payload)
export const createUser = user => instance.post("/users", user)
