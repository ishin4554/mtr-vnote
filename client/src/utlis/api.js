import axios from "axios";
import storage from "./storage";

const instance = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    authorization: storage.getCookie('token')
  }
});

export const createCourse = course => instance.post("/courses", course);
export const getCourse = id => instance.get(`/courses/${id}`);
export const getCourses = payload => instance.get(`/courses?userId=${payload.userId}&isPublic=${payload.isPublic}`);
export const deleteCourse = id => instance.delete(`/courses/${id}`);
export const updateCourse = (id, course) => instance.patch(`/courses/${id}`, course);
export const createComment = comment => instance.post("/comments", comment);
export const getComments = payload => instance.get(`/comments?userId=${payload.userId}&courseId=${payload.courseId}`)
export const deleteComment = id => instance.delete(`/comments/${id}`);
export const updateComment = (id, comment) => instance.patch(`/comments/${id}`, comment);

export const getUser = id => instance.get(`/users/${id}`);
export const getUsers = payload => instance.get(`/users?search=${payload.email}`);
export const login = payload => instance.post("/login", payload)
export const createUser = user => instance.post("/users", user)
export const updateUser = (id, user) => instance.patch(`/users/${id}`, user);
