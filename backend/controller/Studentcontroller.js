import Student from "../models/Student.model.js";
import cloudinary from "../service/cloudinary.js";
 export const handlestudentupload = async(req,res)=>{
     try {
        const { name, company, position, amount } = req.body;
        if (!name || !company || !position || !amount) {
           return res.status(400).json({message : "All fields are required"});
        }
        if(!req.file){
            return res.status(400).json({message : "Profile photo  is requried "});
        }
      const result = await new Promise((resolve , reject)=>{
        const stream = cloudinary.uploader.upload_stream(
            {folder : "students"},
            (error , result)=>{
                if(error) reject(error);
                else resolve(result);
            }
        );
        stream.end(req.file.buffer);
      });
      const imageUrl = result.secure_url;
      const student = await Student.create({
        name,
        company,
        position,
        amount,
        profilephoto : imageUrl
      });
      res.status(201).json(student);
     } catch (error){
        return res.status(500).json({message : `${error}`});
     }
};
export const getallstudent = async(req,res)=>{
try {
    const allstudents = await Student.find({});
    return res.status(200).json(allstudents);
} catch (error) {
   return res.status(500).json({message : `${error}`});
}
}