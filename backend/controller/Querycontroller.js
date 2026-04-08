import Query from "../models/Quiries.model.js";
import { sendmail } from "../service/nodemailer.js";
export const handleaddquery = async (req,res)=>{
    try {
        const {name , email , contact ,description} = req.body;
        if(!name|| !email || !contact || !description){
            return res.status(400).json({message : "All fields are required"});
        }
        const query = await Query.create({
            name,
            email,
            contact,
            description
        })
        // Send emails with query ID (convert to string)
        try {
            await sendmail({name , email , contact, message:description, queryId: query._id.toString() })
        } catch (emailError) {
            console.log("Email sending error:", emailError);
            // Don't fail the request if email fails, but log it
        }
        return res.status(200).json({
            message: "Query submitted successfully",
            queryId: query._id.toString(),
            query: query
        });
        
    } catch (error){
        console.log("Query creation error:", error);
        return res.status(500).json({message : 'Internal server error', error: error.message});   
    }
}

export const getquery = async (req,res)=>{
    try {
        const allquery = await Query.find();
        return res.status(200).json(allquery);
    } catch (error) {
        return res.status(500).json({message : "query  server error"});
    }
}
export const deletequery = async (req,res)=>{
   try {
    const queryid = req.params.id;
    if(!queryid){
        return res.status(400).json({message : "Query id is required"});
    }
    const deleteQuery = await Query.findByIdAndDelete(queryid)
    if(!deleteQuery){
        return res.status(404).json({message : "Query not found "});
    }
    return res.status(200).json({message : 'Query deleted !'})
   } catch (error) {
    return res.status(500).json({message : "Internal server error"});
   }
}
