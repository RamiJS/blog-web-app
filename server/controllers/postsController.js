const Posts = require('../models/Posts')
const User = require('../models/User')
const UserComment = require('../models/CommentSchema')
const jwt = require('jsonwebtoken')
const { Storage } = require('@google-cloud/storage');
const dotenv = require('dotenv');
const Multer = require("multer");

dotenv.config();

console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

module.exports.all_posts = async(req, res) => {
    let AllPosts = await Posts.find().select('-updatedAt -__v').populate('comments likedBy postedBy comments.postedBy').sort({createdAt: -1}) // .filter({isDeleted: false})
    console.log(AllPosts);
    let data = AllPosts.filter(x => x.isDeleted == false)
    res.status(200).json(data)
}

module.exports.one_post = async(req, res) => {
    const postId = req.params.id
    let onePost = await Posts.findById(postId).select('-updatedAt -__v').populate('comments likedBy postedBy comments.postedBy').sort({createdAt: -1})
    res.status(200).json(onePost)
}


// get posts by a single user
module.exports.user_posts = async(req, res) => {
    var userId = req.params.id

        try {
            let userPosts = await Posts.find({postedBy: userId}).populate('postedBy').sort({createdAt: -1})
            let data = userPosts.filter(x => x.isDeleted == false)
            res.status(200).json(data)
        } catch (err) {
            console.log(err)
        } 
 }

let projectId = process.env.GOOGLE_PROJECT_ID
let keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS
// Creates a client
const storage = new Storage({
  projectId,
  keyFilename
});
const bucket = storage.bucket('blogoty_profile');

module.exports.upload_posts = async(req, res, next) => {
    const { content, title, brief } = req.body
    const userId = req.session.user._id;
    // console.log("🚀 ~ file: postsController.js:36 ~ module.exports.upload_posts=async ~ userId", image)
    let image = req.file;
    try {
        if (image) {
          console.log("File found, trying to upload...");
          const blob = bucket.file(image.originalname);
          const blobStream = blob.createWriteStream();
    
          blobStream.on("finish", () => {
            console.log("Success");
            const imageUrl = `https://storage.googleapis.com/${bucket.name}/${image.originalname}`;
            let postedBy = userId;
            Posts.create({ postedBy, content, title, brief, image: imageUrl})
              .then((post) => {
                res.status(201).json({ post: post._id,  postedBy, image: imageUrl});
              })
              .catch((error) => {
                res.status(500).send(error);
              });
          });
          blobStream.end(image.buffer);
        } else {
          throw "error with img";
        }
      } catch (err) {
        res.status(404).send(err)
    }
}


module.exports.upload_image = async (req, res, next) => {
  console.log("Made it /upload");
  try {
    if (req.file) {
      console.log("File found, trying to upload...", req.file);
      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream();

      blobStream.on("finish", () => {
        res.status(200).send("Success");
        console.log("Success");
      });
      blobStream.end(req.file.buffer);
    } else throw "error with img";
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.like = async(req, res, next) => {

    var postId = req.params.id
    var userId = req.session.user._id
    var isLiked = req.session.user.likes && req.session.user.likes.includes(postId);
    var option = isLiked ? "$pull" : "$addToSet"

    console.log("is liked: " + isLiked);
    console.log("OPTION: " + option);

        req.session.user = await User.findByIdAndUpdate(userId, { [option]: { likes: postId } }, { new: true})
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })

        var post = await Posts.findByIdAndUpdate(postId, { [option]: { likedBy: userId }}, { new: true})
        .catch(err => {
            console.log(err);
            res.sendStatus(400)
        })

        res.status(200).send(post) 

}


module.exports.update_post = async(req, res, next) =>{

    const { content } = req.body
    const postId = req.params.id
    const userId = req.session.user._id
    const post = await Posts.findById(postId)

    if (userId == post.postedBy) {
        try {
            let updatedPost = await Posts.findByIdAndUpdate(postId, { content }, { new: true })
           
            res.status(200).send(updatedPost) 
    
        }catch(err) {
            res.sendStatus(400)
            console.log(err);
        }
    } else {
        console.log('YOU ARE NOT AUTHORIZED');
        res.sendStatus(400)
    }

}



module.exports.delete_post = async(req, res, next) =>{
    let postId = req.params.id

    let post = await Posts.findById(postId)


    let userId = req.session.user._id

    if(userId == post.postedBy) {
        try {
            post = await Posts.findByIdAndUpdate(postId, { $set: { isDeleted: true }}, { new: true } ) 
                  
             res.status(200).json({isDeleted: post.isDeleted})
                   
            
        } catch (err) {
            console.log(err);
            res.sendStatus(400)
        }
    }
    else {
        console.log('YOU ARE NOT AUTHORIZED');
        res.sendStatus(401)
    }
    next()
}

// module.exports.delete_post = async(req, res, next) =>{
//     let postId = req.params.id

//we wanna know what the post is, so we could use its postedBy entity to compare it with the user
// then we wanna create an IF function to delete posts if user id and postedBy match

//     let post = await Posts.findById(postId)
//     let userId = req.session.user._id


//     if(userId == post.postedBy) {
//         try { 
//             var deletePost = await Posts.findByIdAndDelete(postId, function (err, docs) {
//                 if (err) {
//                     console.log(err);
//                     res.sendStatus(400)
//                 } else {
//                     console.log('deleted successfully');
//                     res.status(200).send('deleted successfully');
//                 }
//                 }) 
//         } catch(err) {
//             console.log(err);
//             res.sendStatus(400)
//         }
//       }   else {
//         console.log('YOU ARE NOT AUTHORIZED');
//         res.sendStatus(401)
//       }
// }



module.exports.user_likes = async function (req, res) {
    const userId = req.params.id
    let userLikes = await User.findById(userId).populate({path: 'likes', populate: {path: 'postedBy'}}).sort({createdAt: -1})
    let data = userLikes.likes.filter(x => x.isDeleted == false)
    // console.log(userLikes.likes.filter(x => x.isDeleted == false));
        // const data = userLikes.filter(x => x.isDeleted == false);
   
    // console.log(data);
    // data.push(userLikes)
    // console.log(data.filter(x => x.isDeleted == false));
    res.status(200).json(data)
}