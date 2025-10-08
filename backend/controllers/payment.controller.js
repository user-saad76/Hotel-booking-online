

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

  
     const session = await stripe.checkout.sessions.create({
     success_url: 'http://localhost:5173/success',
     cancel_url:'http://localhost:5173/cancel',
     ui_mode: "hosted",
    line_items: [lineItem],
     payment_method_types:["card"],
       mode: 'payment', 
  });
   console.log("✅ Stripe Session Created:", session.id);

     res.json({ id: session.id, url: session.url }); // ✅ return both
} catch (error) {
     console.error("❌ Stripe Error:", error);
}
}