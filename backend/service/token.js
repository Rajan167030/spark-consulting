
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
async function genratetoken(userid , res){
  //  creating token for user 
  console.log(process.env.JWT_SECRET);
  
  const token = jwt.sign({userid} , process.env.JWT_SECRET,{
    expiresIn : "7d",
  })
  res.cookie("jwt", token, {
  maxAge: 7 * 24 * 60 * 60 * 1000, // in milliseconds (7 days)
  httpOnly: true,  // prevent JavaScript access (protects against XSS)
  sameSite: "lax",  // prevents CSRF attacks by only sending cookie from same site
});
return token;
};

export {genratetoken}