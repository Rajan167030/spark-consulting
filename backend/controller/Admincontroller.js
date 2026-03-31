import dotenv from 'dotenv'
dotenv.config();
import jwt from 'jsonwebtoken'
export const handladminlogin = async(req,res)=>{
    try {
       const {email , password } = req.body;
       if(email !== process.env.ADMIN_LOGIN || password !== process.env.ADMIN_LOG_PASS){
        return res.status(400).json({message : "Invalid credentials"});
       }
     const token = jwt.sign({role : 'admin'} , process.env.JWT_SECRET,{
        expiresIn : "7d",
      });
      res.cookie("jwt", token, {
  maxAge: 7 * 24 * 60 * 60 * 1000, // in milliseconds (7 days)
  httpOnly: true,  // prevent JavaScript access (protects against XSS)
  sameSite: "lax",  // prevents CSRF attacks by only sending cookie from same site
});
 return res.status(200).json({message : "Admin Login successfull"})
    } catch (error){
        console.log(error.message);
        return res.status(500).json({message : "Internal server error"});
    }
}

export const getadminsession = async(req,res)=>{
    return res.status(200).json({authenticated : true , role : 'admin'});
}
