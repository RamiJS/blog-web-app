const Posts = require('../models/Posts')
const User = require('../models/User')
const UserComment = require('../models/CommentSchema')
const jwt = require('jsonwebtoken')

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
    const token = req.cookies.jwt;
    var userId = req.session.user._id

        try {
            let userPosts = await Posts.find({postedBy: userId}).sort({createdAt: -1})
            res.status(200).json(userPosts)
        } catch (err) {
            console.log(err)
        } 
 }
 

module.exports.upload_posts = async(req, res, next) => {
    const { content, title, brief } = req.body
    const userId = req.session.user._id;
    console.log("🚀 ~ file: postsController.js:36 ~ module.exports.upload_posts=async ~ userId", userId)

            try {
                let postedBy = userId
                const post = await Posts.create({ postedBy, content, title, brief});
                res.status(201).json({ post: post._id,  postedBy})
            } catch (err) {
                res.status(404).send(err)
                console.log(err);
            }
}


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
    let userLikes = await User.findById(userId).select('-image -roles -username -email -status -password').populate('likes').sort({createdAt: -1})
    let data = userLikes.likes.filter(x => x.isDeleted == false)
    // console.log(userLikes.likes.filter(x => x.isDeleted == false));
        // const data = userLikes.filter(x => x.isDeleted == false);
   
    // console.log(data);
    // data.push(userLikes)
    // console.log(data.filter(x => x.isDeleted == false));
    res.status(200).json(data)
}