const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userComment = new Schema({
    comment: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    postId: String,
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    }
})



userComment.post('save', function (doc, next) {
    console.log('new comment was created', doc)
    
    next();
})

const UserComment = mongoose.model('comments', userComment)

module.exports = UserComment;