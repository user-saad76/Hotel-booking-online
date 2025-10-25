import Complaint from "../models/ComplainMessages.model.js";

export const CreateComplainMessages = async(req,res,next)=>{
   try {
         const data = req.body;
          console.log("complain messages", data);
           const complain = await Complaint.create({
                name: data.name,
                email:data.email,
                message:data.message,
                status:data.status
               
              });
          
              // ✅ Standardized response
              res.json({
                success: true,
                message: "✅ Complain created successfully",
                data: complain,
              });

   } catch (error) {
       console.error("❌ Error creating review:", error);
    res.status(500).json({ success: false, message: "Server Error" });
   }

} 
 export const GetComplainMessages = async(req,res,next)=>{
   const qData = req.query;
     console.log(qData);
     const complain = await Complaint.find(qData);
     res.json(complain);
} 
 