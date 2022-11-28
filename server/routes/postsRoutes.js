const { Router } = require('express');
const postsController = require('../controllers/postsController')

const router = Router();

router.get('/posts', postsController.all_posts)
router.get('/posts/:id', postsController.one_post)
router.get('/:id/posts', postsController.user_posts)
router.post('/post', postsController.upload_posts)

router.put('/post/:id/like', postsController.like) 

router.patch('/posts/:id/update', postsController.update_post)
router.delete('/posts/:id/delete', postsController.delete_post)

module.exports = router;