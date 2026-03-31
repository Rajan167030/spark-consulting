import { Router } from "express";
const route = Router();
import {handleaddquery , getquery , deletequery} from '../controller/Querycontroller.js'
route.post('/addquery',handleaddquery)
// route.get('/getquery/' , getquery);
// route.delete('/deletequery/:id' ,deletequery )


export default route;