const { Router } = require('express');
const commentController = require('../controllers/commentController')

const router = Router();

router.post('/:id/comment', commentController.comment)
router.get('/:id/comments', commentController.get_comments)

module.exports = router;