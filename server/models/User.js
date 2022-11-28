const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
}

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
        minLength: 6,
    },
    email: {
        type: String,
        required: [true, 'Please enter an email address'],
        unique: true,
        lowercase: true, // in case the user had caps-lock on, we will take his email and turn it to lowercase
        validate: [isEmail , 'Please enter a valid email address'],
    },
    password: { 
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [4, 'Please enter at least 4 characters'],
    },
    likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    },
    roles: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    image: {
        type: String,
        default: 'http://place-puppy.com/200x200'
    }
});


userSchema.post('save', function (doc, next) {
    console.log('new user was created', doc)
    
    next();
})

//  fire a function before a doc is saved to the DB
userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// A Static Method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }   
        throw Error('Incorrect password')
    } 
    throw Error('Incorrect email')
}


const User = mongoose.model('user', userSchema);

module.exports = User;