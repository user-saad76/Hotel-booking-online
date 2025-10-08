import  User  from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupUser = async (req, res) => {
    
    const data = req.body;
    console.log('user data',data);
      const hashedPassword = await bcrypt.hash(data.password, 10);
       data.password = hashedPassword;
   await User.create(data)
  res.json({
    message: "user sign up ",
   
  });
};  export const signinUser = async (req, res) => {
    
    const {email,password} = req.body;
      const user =  await User.findOne({email});
    console.log( "user",user);
   
   await User.create(user)
   if(!user || user.length === 0 ){
     return res.status(404).json({
        success:false,
        message:"user not found"
     })
   }

   const isMatched =  await bcrypt.compare(password,user.password)
   if(!isMatched){
     return res.status(401).json({
        success:false,
         message:'Invalid password'
     })
   }
  //Sign a JWT Token
  
  const token = jwt.sign({
    id:user._id,
    email:user.email,
    name:user.fullname,
    role:user.role
  },process.env.JWT_SECRET, { expiresIn: '1h' });

   res.cookie("jwt-token", token, {
  httpOnly: true,
   sameSite: "lax",   // prevents client-side JS from accessing cookie
  maxAge: 3600000,// 60 minutes
   secure:false,
});
  res.json({
    message: "user has been logged in ",
  });

};

export const getMe = async(req,res,next)=>{
    const user =  await User.findById(req.user.id).select("-password");
    res.status(200).json(user)
}

export const logout = async(req,res,next)=>{
    
   res.cookie("jwt-token", null, {
  httpOnly: true,   
   sameSite: "lax",    // recommended for CSRF protection
    expires: new Date(0),
   secure:false,
   
});
res.json({
    message: "user has been logged out ",
  })
}