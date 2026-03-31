import { Router } from "express";
import upload from "../service/multer.js";
const route = Router();

import { handlestudentupload , getallstudent } from "../controller/Studentcontroller.js";

route.get('/getstudent' , getallstudent);

export default route;
