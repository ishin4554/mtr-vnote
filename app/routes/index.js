const express = require('express');
const router = express.Router();

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

// user 
router.post('/users', userController.addUser);
router.post('/login', userController.loginUser);

module.exports = router;
