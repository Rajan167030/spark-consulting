import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const admincheck = async(req,res,next)=>{
    try {
        // Get token from Authorization header or cookies (for backward compatibility)
        const authHeader = req.headers.authorization;
        const token = authHeader ? authHeader.replace('Bearer ', '') : req.cookies.jwt;
        
        if(!token){
            return res.status(401).json({message : "Token not found"});
        }
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message : "Invalid token"});
        }
        const logrole = decoded.role;
        if(logrole!=='admin'){
            return res.status(403).json({message : "Access denied"});
        }
        req.admin = decoded;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : "Internal server error"});
    }
}