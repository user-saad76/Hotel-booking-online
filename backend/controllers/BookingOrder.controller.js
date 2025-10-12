import BookingOrders from '../models/BookingOrder.schema.js'

export const getAllBookingOrders = async(req,res,next)=>{
    console.log('Hello from all orders');
    
  try {
       const bookingOrders= await BookingOrders.find();
       res.status(200).json({
         bookingOrders
       })
  } catch (error) {
    console.log(error);
    res.json({
        message:error?.message ||"Could not fetch BookingOrders"
    })
    
  }
}
export const getBookingOrderById = async(req,res,next)=>{
   try {
      const {id} =req.params;
      const  bookingOrder = await BookingOrders.findById(id)
      res.status(200).json({
         bookingOrder
       })
  } catch (error) {
    console.log(error);
    res.json({
        message:error?.message ||"Could not fetch BookingOrders"
    })
    
  }
}
export const  UpdateBookingOrderById = async(req,res,next)=>{
    try {
        const {id} =req.params;
        const body = req.body;
      const  bookingOrder = await BookingOrders.findByIdAndUpdate(id,body)
      res.status(200).json({
         bookingOrder
       })
  } catch (error) {
    console.log(error);
    res.json({
        message:error?.message ||"Could not fetch BookingOrders"
    })
    
  }
}
export const  deleteBookingOrderById = async(req,res,next)=>{
     try {
         const {id} =req.params;
      const  bookingOrder = await BookingOrders.findByIdAndDelete(id)
      res.status(200).json({
         bookingOrder
       })
  } catch (error) {
    console.log(error);
    res.json({
        message:error?.message ||"Could not fetch BookingOrders"
    })
    
  }
}