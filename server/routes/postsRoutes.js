const { Router } = require('express');
const postsController = require('../controllers/postsController')
const Multer = require("multer");
const router = Router();

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // No larger than 5mb, change as you need
    },
  });

router.get('/posts', postsController.all_posts)
router.get('/posts/:id', postsController.one_post)
router.get('/:id/posts', postsController.user_posts)
router.get('/:id/likes', postsController.user_likes)

router.post('/post', multer.single("imgfile"), postsController.upload_posts)
router.post('/upload-image', multer.single("imgfile"), postsController.upload_image)

router.patch('/posts/:id/like', postsController.like) 
router.patch('/posts/:id/update', postsController.update_post)
router.patch('/posts/:id/delete', postsController.delete_post)

module.exports = router;