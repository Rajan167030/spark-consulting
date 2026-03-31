import mongoose from "mongoose";
import { Schema } from "mongoose";

const Quieryschema = new mongoose.Schema({
    name : {
        type :String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    contact: {
  type: String,
  required: true,
  match: /^[0-9]{10}$/
},
    description : {
        type : String,
        required : true
    }
});

const Query = new mongoose.model('Query' , Quieryschema);
export default Query;