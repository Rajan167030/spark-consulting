import { Router } from "express";
import upload from "../service/multer.js";
import { getadminsession, handladminlogin } from "../controller/Admincontroller.js";
import { getquery, deletequery } from "../controller/Querycontroller.js";
import { admincheck } from "../middlewares/Admincheck.js";
import { addcompany, deletecompany } from "../controller/companycontroller.js";
import { handlestudentupload } from "../controller/Studentcontroller.js";

const route = Router();

route.post('/login' , handladminlogin);
route.get('/me' , admincheck , getadminsession);
route.get('/getquery' , admincheck , getquery);
route.delete('/deletequery/:id' , admincheck , deletequery);
route.post('/addcompany' , admincheck , upload.single('logo') , addcompany);
route.delete('/deletecompany/:id' , admincheck , deletecompany);
route.post('/addstudent' , admincheck , upload.single('profilephoto') , handlestudentupload);

export default route;
