//import
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import session from 'express-session'
import mongoose from 'mongoose';
import path from 'path';
import crypto from 'crypto'
//import routes
import authRouter from "./routes/auth.js"
import uploadRouter from './routes/upload.js'
//import middleware
import { verifyToken } from './middleware/verifyToken.js'

//config
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set it to true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));
//file dir
import __dirname from './util/__dirname.js'
//dotenv
dotenv.config();
const port = process.env.PORT || 3000;
//static
app.use('/assets',express.static(path.join(__dirname,'../assets')));
app.use('/public',express.static(path.join(__dirname,'../public')));

//routes
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'../view/index.html'))
})
app.use('/auth',authRouter)
app.use('/upload',verifyToken,uploadRouter)
//listen
mongoose
  .connect(process.env.MONGO_URL,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  }).then(()=>{
    app.listen(port,()=>{
      console.log(`Server Port: ${port}`)
      // User.insertMany(users);
      // Post.insertMany(posts);
    })
  }).catch(err=>console.log(`${err}: did not connect`))