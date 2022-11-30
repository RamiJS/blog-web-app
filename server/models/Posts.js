const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const postSchema = new Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true,
        minLength: 10
    },
    content: {
        type: String,
        required: true,
        minLength: 200
    },
    brief: {
        type: String,
        required: true,
        minLength: 25
    },
    image: {
        type: String,
        default: 'http://place-puppy.com/500x500'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    }],
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],

    // likesCount: {
    //     type: Number,
    //     default: 0
    // }
  
}, { timestamps: true })

postSchema.post('save', function (doc, next) {
    console.log('new post was created / updated', doc)
    
    next();
})

const Posts = mongoose.model('posts', postSchema);

module.exports = Posts;