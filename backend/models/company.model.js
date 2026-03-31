import mongoose from "mongoose";
import { Schema } from "mongoose";

const companyschema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    logo : {
        type : String,
        required : true
    },
},{timestamps : true});

const Company = new mongoose.model('Company' , companyschema);
export default Company;
