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
const MongoDBStore = require( "connect-mongodb-session");

const session = require('express-session');


const app = express();

// middleware


app.use(express.static('public'));
app.use(bodyParser.urlencoded(
  { extended:true }
))
app.use(express.json());
app.use(cookieParser())

app.use(session({
  secret: 'testing',
  resave: true,
  saveUninitialized: false,
  cookie: {
    sameSite: false,
    secure: false,
    maxAge: 1*60*60*1000,
    httpOnly: true,
  }
}))

const corsOptions ={
  origin: 'http://localhost:8080', 
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "PATCH", "DELETE"],
  credentials:true,          
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:8080")
//   res.header("Access-Control-Allow-Methods", 'GET, POST, PUT, DELETE, OPTIONS')
//   next()
// }) 

// app.use((req, res, next) => {
//   console.log('DEBUG: req.session', req.session);
//   next();
// });

// view engine
app.set('view engine', 'ejs');

// database connection
// const dbURI = 'mongodb+srv://admin:1234@cluster0.wvcjn.mongodb.net/?retryWrites=true&w=majority';
const dbURI = 'mongodb://localhost:27017/blogProject';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false})
  .then((result) => app.listen(3000, console.log("\x1b[34m", result.Connection)))
  .catch((err) => console.log(err));

  process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
    // Recommended: send the information to sentry.io
    // or whatever crash reporting service you use
  })
  
// routes
app.use(authRoutes)
app.use(fileRoutes)
app.use(postsRoutes)
app.use(commentRoutes)
