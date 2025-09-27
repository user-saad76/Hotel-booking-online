import  User  from "../models/user.model.js";
import bcrypt from "bcryptjs";

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
      const user =  await User.find({email})
    console.log(user);
   
   await User.create(user)
   if(!user || user.length === 0 ){
     return res.status(404).json({
        success:false,
        message:"user not found"
     })
   }

  const isMatched =  await bcrypt.compare(password,user[0].password)
  if(!isMatched){
    return res.status(401).json({
        success:false,
        message:'Invalid password'
    })
  }
  res.json({
    message: "user found",
  });

};