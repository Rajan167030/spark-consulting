import { Router } from "express";
import upload from "../service/multer.js";
const route = Router();
import { addcompany , getcompany} from "../controller/companycontroller.js";

route.get('/getcompany' ,getcompany)
export default route