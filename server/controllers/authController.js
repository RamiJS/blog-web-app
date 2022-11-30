const User = require('../models/User')
const jwt = require('jsonwebtoken')

// handle errors
const handleError = (err) => {
    console.log(err.message, err.code);
    let errors = {email: '', password: ''};

    //  incorrect email
    if(err.message === 'Incorrect email') {
        errors.email = 'this email is not registered'
    }

    // incorrect password
    if(err.message === 'Incorrect password') {
        errors.password = 'password is incorrect'
    }

    // duplicate error code
    if (err.code === 11000){
        errors.email = 'email is already registered';
        return errors;
    }

    // validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

// creating JWT everytime a user logs in or signs up, and it will be used in the function below.

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'yoji', {
        expiresIn: maxAge
    });
}


module.exports.signup_get = (req, res) => {
    res.render('signup')
}





// check whether a user is logged in or not.
module.exports.login_get = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, 'yoji', async(err, decodedToken) => {
            if (err) {
                console.log(err.message);
                next();
            } else {
                let user = await User.findById(decodedToken.id)
                res.locals.user = user;
                console.log(user)
                res.status(200).json({ userId: user._id, email: user.email, username: user.username, roles: user.roles });
                next();
            }
        })
    } else {
        console.log('no user is logged in currently')
        next();
    }
}

module.exports.signup_post = async(req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ email, password, username}).then((user) =>{
            req.session.user = user;
            console.log(req.session.user.id);
            res.status(200).json({ username: user.username, email: user.email, roles: user.roles, likes: user.likes });
            console.log('LOOGING' + user);
        })
        // const token = createToken(user._id);
        // res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
       
    } 

    catch (err) {
        const errors = handleError(err);
        res.status(400).json({errors})
    }
}

module.exports.login_post = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        req.session.user = user;
        console.log(req.session.user);
        res.status(200).json({ user: user._id, email: user.email, username: user.username, roles: user.roles });
        console.log('user session ' + req.session.user);
    }
    catch(err) {
        const errors = handleError(err);
        res.status(400).json({errors})
    }
}


module.exports.update_patch = async(req, res, next) => {
    const id = req.params.id
    const update = req.body
    const token = req.cookies.jwt;
// checking if if there is a token. if there is one, then we will see if it matches the one that is requested to be changed.
    if(token) {
        jwt.verify(token, 'yoji', async(err, decodedToken) => {
            let user = await User.findById(decodedToken.id)
            if (user.id == id) {
                try {
                    const result = await User.findOneAndUpdate(id, update)
                    res.send(result)
                    next();
                }
                catch(err) {
                    console.log(err)
                }
            } else {
                console.log(err)
                res.send('user id doesnt match')
                console.log(id, '',user)
            }
        })
    }
}


module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/login');
}