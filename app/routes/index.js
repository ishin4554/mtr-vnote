const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middlewares/auth');
// const auth = require('../middlewares/auth');
const commentController = require('../controllers/commentController');
const courseController = require('../controllers/courseController');
const userController = require('../controllers/userController');


router.get('/', (req, res) => res.end('hello'));

// comments
router.post('/comments', commentController.addComment);
router.get('/comments', commentController.getComments);
router.patch('/comments/:id', commentController.updateComment);
router.delete('/comments/:id', commentController.deleteComment);

// course
router.post('/courses', courseController.addCourse);
router.get('/courses', courseController.getCourses);
router.get('/courses/:id', courseController.getCourse);
router.delete('/courses/:id', courseController.deleteCourse);
router.patch('/courses/:id', courseController.updateCourse);

// user 
router.get('/users', userController.getUsers);
router.post('/users', userController.addUser);
router.patch('/users/:id', userController.updateUser);
router.post('/login', userController.loginUser);

module.exports = router;
