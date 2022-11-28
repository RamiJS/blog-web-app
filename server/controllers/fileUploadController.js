const multer = require('multer')
const Image = require('../models/Files')
const path = require('path')
const fs = require('fs');
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const checkUser = require('../middleware/authMiddleware')


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './files/images')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname  )
    }
})

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb, res) => { // we specify the file types that we will allow user to submit.
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {  //application/pdf
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
      }

})


module.exports.upload_post = [upload.single('file'), async (req, res, next) => {
    
  res.send('file uploaded successfully')
  console.log('uploaded');
  const token = req.cookies.jwt;

  if(token) {
    jwt.verify(token, 'yoji', async(err, decodedToken) => {
        if (err) {
            console.log(err.message);
            
            next();
        } else {
            let user = await User.findById(decodedToken.id)
            let image = new Image({
                user_id: user._id,
                file: req.file.filename
               })
              
               try {
                image = await image.save()
                console.log(image);
               }
               catch (error){
                console.log(error);
               }
            next();
        }
    })
}
}]


module.exports.upload_file_get = async(req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'yoji', async(err, decodedToken) =>{
            if(err) {
                console.log(err);
                next()
            }
            else {
                let user = await User.findById(decodedToken.id)
                let user_id = await user._id
                try{
                    const files = await Image.find({user_id})
                    res.send(files)
                    } catch (err){
                        console.log(err, 'err');
                    }
                    next();
            }
         
        })
    }
    
}