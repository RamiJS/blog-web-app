const { Router } = require('express');
const postsController = require('../controllers/postsController')

const router = Router();

router.get('/posts', postsController.all_posts)
router.get('/posts/:id', postsController.one_post)
router.get('/:id/posts', postsController.user_posts)
router.get('/:id/likes', postsController.user_likes)

router.post('/post', postsController.upload_posts)

router.patch('/posts/:id/like', postsController.like) 
router.patch('/posts/:id/update', postsController.update_post)

router.patch('/posts/:id/delete', postsController.delete_post)

module.exports = router;