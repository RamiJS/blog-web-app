const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes')
const commentRoutes = require('./routes/commentRoutes');
const likeRoutes = require('./routes/likeRoutes');
const postsRoutes = require('./routes/postsRoutes')
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const bodyParser = require("body-parser");
const cors = require("cors");

const session = require('express-session');


const app = express();

// middleware

app.use(express.static('public'));
app.use(bodyParser.urlencoded(
  { extended:true }
))
app.use(express.json());
app.use(cookieParser())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  next()
}) 

app.use(session({
  secret: 'i am not fat',
  resave: true,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1*60*60*1000
  }
}))

// app.use((req, res, next) => {
//   console.log('DEBUG: req.session', req.session);
//   next();
// });


const corsOptions ={
  origin:'http://localhost:8080', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

// view engine
app.set('view engine', 'ejs');

// database connection
// const dbURI = 'mongodb+srv://admin:1234@cluster0.wvcjn.mongodb.net/?retryWrites=true&w=majority';
const dbURI = 'mongodb://localhost:27017/blogProject';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false})
  .then((result) => app.listen(3000, console.log(result.Connection, 'hi')))
  .catch((err) => console.log(err));


// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes)
app.use(fileRoutes)
app.use(postsRoutes)
app.use(commentRoutes)