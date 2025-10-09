

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripePayment = async(req,res,next)=>{
  console.log("📦 bookingData:", req.body); 
try {
   const bookingData =req.body;
   console.log('bookingData', bookingData);
   
     const  lineItem  = {
       price_data: {
         currency: "usd",
         product_data: {
           name: bookingData.name,
         },
        unit_amount: Math.round(bookingData.totalPrice * 100)

       },
       quantity: bookingData.guest || 1,
     };

      console.log(lineItem);

     console.log('-----req?.user?._id',req?.user?._id);
     
     const session = await stripe.checkout.sessions.create({
     success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
     cancel_url:'http://localhost:5173/cancel',
     ui_mode: "hosted",
    line_items: [lineItem],
     payment_method_types:["card"],
       mode: 'payment',
       client_reference_id:req?.user?._id
  });
   console.log("✅ Stripe Session Created:", session.id);

     res.json({ id: session.id, url: session.url }); // ✅ return both
} catch (error) {
     console.error("❌ Stripe Error:", error);
}
}
 
export const confirmPayment = async(req,res,next)=>{
 try {
      const {sessionId} = req.body;
   console.log('sessionId',sessionId);
const session = await stripe.checkout.sessions.retrieve(sessionId);
console.log('session',session);

//create payment 
 } catch (error) {
   console.log('Session retrive error');
   
 }

   
}