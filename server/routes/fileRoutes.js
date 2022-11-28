const { Router } = require('express');
const fileUploadController = require ('../controllers/fileUploadController');

const router = Router(); 

router.get('/upload', fileUploadController.upload_file_get);
// router.post('/upload', fileUploadController.upload_post);
router.post('/upload', fileUploadController.upload_post);


module.exports = router;