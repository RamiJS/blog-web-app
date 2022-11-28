const UserComment = require('../models/CommentSchema')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const Posts = require('../models/Posts')


module.exports.comment = async(req, res, next) => {
    const token = req.cookies.jwt;
    const { id } = req.params
    const { comment } = req.body
    const user = req.session.user._id

        try {
            const postId = id
            let postedBy = user

            const postComment = new UserComment ({
                postId,
                postedBy,
                comment
            })

            await postComment.save();
            const postRelated = await Posts.findById(id)
            postRelated.comments.push(postComment)
            await postRelated.save();
            res.send(postComment)
        } catch(err) {
            res.status(404).send(err)
            console.log(err);
        }
}

module.exports.get_comments = async(req, res, next) => {
    const { id } = req.params;

    try {
        let postComments = await UserComment.find({postId: id})
        res.status(200).json(postComments)
    }
    catch(err) {
        console.log(err);
        res.send(err)
    }
}