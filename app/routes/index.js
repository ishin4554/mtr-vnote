const express = require('express');
const router = express.Router();

// const auth = require('../middlewares/auth');
const commentController = require('../controllers/commentController');

router.get('/', (req, res) => res.end('hello'));
router.post('/comments', commentController.addComment);
router.get('/comments', commentController.getComments);
router.patch('/comments/:id', commentController.updateComment);
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;
