import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Connectdb } from './service/connectdb.js';
import adminroute from './routes/Adminroute.js'
import studentroute from './routes/Studentroute.js'
import companyroute from './routes/Companyroute.js'
import queryroute from './routes/Queryoute.js'
const app = express();
dotenv.config();
const allowedOrigins = (
    process.env.FRONTEND_URLS ||
    process.env.FRONTEND_URL ||
    'http://localhost:8080,http://localhost:5173'
)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const isAllowedOrigin = (origin) => {
    if(!origin){
        return true;
    }

    if(allowedOrigins.includes(origin)){
        return true;
    }

    return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
};

app.use(cors({
    origin : (origin, callback) => {
        if(isAllowedOrigin(origin)){
            return callback(null, true);
        }
        return callback(null, false);
    },
    credentials : true
}))
app.use(express.json())
app.use(express.urlencoded({
    extended : true
}))
app.use(cookieParser());
app.get('/' ,(req,res)=>{
    res.send('hello world')
})
app.use('/admin',adminroute);
app.use('/student',studentroute);
app.use('/company',companyroute);
app.use('/query',queryroute)
Connectdb();
app.listen(3000,()=>{
    console.log('server stared on port 3000');
})
