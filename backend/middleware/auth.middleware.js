  import jwt from 'jsonwebtoken'
  export const isAuthenticated = async( req,res,next)=>{
      const token = req.cookies['jwt-token'];
      console.log('********',token);
      
      if(!token){
        return res.status(401).json({message:'You are not authenticated.'})
      }
      //token verification
       const  decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log("+++++",decoded)
          req.user = decoded;

        next();     
}
export const isAuthorized = (req,res,next)=>{
  return null;
}