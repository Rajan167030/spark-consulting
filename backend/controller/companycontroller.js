import Company from "../models/company.model.js";
import cloudinary from "../service/cloudinary.js";
export const addcompany = async(req,res)=>{
    try {
        const {name} = req.body;
        if(!name ){
          return  res.status(400).json({message : "Name of company is required"});
        }
        if(!req.file){
           return res.status(400).json({message : "logo is required"});
        }
          const result = await new Promise((resolve , reject)=>{
                const stream = cloudinary.uploader.upload_stream(
                    {folder : "companies",
                     transformation : [
                      {
                        width : 300,
                        height : 300,
                        crop : "fit"
                      },
                      {quality : "auto"},
                      {
                       fetch_format : "auto"
                      }
                     ]
                    },
                    (error , result)=>{
                        if(error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(req.file.buffer);
              });
    const imageUrl = result.secure_url;
    const company = await Company.create({
        name ,
        logo : imageUrl
    });
    res.status(201).json(company);
    } catch (error){
        res.status(500).json({message : "All fields are required"});
        console.log(error);
    }
}

export const getcompany = async(req,res)=>{
     try {
       const allcompany = await Company.find({});
       return res.status(200).json(allcompany);
     } catch (error) {
        console.log(error.message);
        res.status(500).json({message : 'Internal server error'});
     }
}

export const deletecompany = async(req,res)=>{
     try {
       const companyId = req.params.id;
       if(!companyId){
        return res.status(400).json({message : 'Company id is required'});
       }
       const deletedCompany = await Company.findByIdAndDelete(companyId);
       if(!deletedCompany){
        return res.status(404).json({message : 'Company not found'});
       }
       return res.status(200).json({message : 'Company deleted successfully'});
     } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : 'Internal server error'});
     }
}
