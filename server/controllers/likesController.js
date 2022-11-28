// const LikeSchema = require('../models/LikesSchema');
// const User = require('../models/User')
// const jwt =  require('jsonwebtoken')
// const Posts = require('../models/Posts')

// module.exports.likePost = async(req, res) => {
//     const token = req.cookies.jwt;
//     const { id } = req.params;

//     if(token) {
//         jwt.verify(token, 'yoji', async(err, decodedtoken ) => {
//             try {
//                 let userId = await User.findById(decodedtoken.id)
//                 let postId = id

//                 const likePost = new LikeSchema({
//                     postId,
//                     userId
//                 })



//                 await likePost.save();
//                 const postRelated = await Posts.findById(id)
//                 postRelated.likesCount = await LikeSchema.find({ postId: postId}).countDocuments()
//                 postRelated.likes.push(likePost)
//                 await postRelated.save();
//                 res.send(likePost.populate())
//             } catch(err){
//                 console.log(err);
//             }
//         })
//     }
// }


// module.exports.remove_like = async(req, res) => {
    
// }