const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middlewares/auth');
const commentController = require('../controllers/commentController');
const courseController = require('../controllers/courseController');
const userController = require('../controllers/userController');


router.get('/', (req, res) => res.end('hello'));

// comments
router.post('/comments', checkAuth, commentController.addComment);
router.get('/comments', checkAuth, commentController.getComments);
router.patch('/comments/:id', checkAuth, commentController.updateComment);
router.delete('/comments/:id', checkAuth, commentController.deleteComment);

// course
router.post('/courses', checkAuth, courseController.addCourse);
router.get('/courses', checkAuth, courseController.getCourses);
router.get('/courses/:id', checkAuth, courseController.getCourse);
router.delete('/courses/:id', checkAuth, courseController.deleteCourse);
router.patch('/courses/:id', checkAuth, courseController.updateCourse);

// user 
router.get('/users', checkAuth, userController.getUsers);
router.post('/users', userController.addUser);
router.patch('/users/:id', checkAuth, userController.updateUser);
router.post('/login', userController.loginUser);

module.exports = router;
