import mongoose from "mongoose";

const studentScehma = new mongoose.Schema({
    name : {
        type : String,
        required : true, 
    },
    profilephoto : {
        type : String
    },
    company : {
        type : String,
        required : true
    },
    position : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    }
})
const Student = new mongoose.model('Student' , studentScehma)
export default Student;
