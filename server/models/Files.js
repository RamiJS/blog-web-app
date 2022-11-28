const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const fileSchema = new Schema({
    file: {
        type: String,
        default: 'placeholder.jpg',
    },
    user_id: {type: String, required: true},
})

// fileSchema.post('save', function (doc, next) {
//     console.log('new files has been uploaded', doc)
    
//     next();
// })

const Image = mongoose.model('image', fileSchema)

module.exports = Image