import Stripe from 'stripe';
import BookingOrder from "../models/BookingOrder.schema.js";
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

     console.log('-----req?.user?.id',req?.user?.id);
     
     const session = await stripe.checkout.sessions.create({
     success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
     cancel_url:'http://localhost:5173/cancel',
     ui_mode: "hosted",
    line_items: [lineItem],
     payment_method_types:["card"],
       mode: 'payment',
      // client_reference_id:req?.user?._id
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
const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'customer'],
    });
console.log('session',session);
 console.log("💳 Session Retrieved:", session.id);


      // Prepare object that matches schema
    const bookingData = {
      //userId: req?.user?._id || "671e41bdbf3d6c001234abcd", // test fallback
      //hotelId: "671e41c3bf3d6c001234dcba", // test fallback
      checkInDate: new Date(),
      checkOutDate: new Date(),
      totalNights: 1,
      totalGuests: 1,
      stripeSessionId: session.id,
      paymentStatus: session.payment_status || "pending",
      paymentIntentId: session.payment_intent?.id || null,
      customer_email: session.customer_details?.email || null,
      customer_name: session.customer_details?.name || null,
      customer_phone: session.customer_details?.phone || null,
      amount_subtotal: session.amount_subtotal || 0,
      amount_total: session.amount_total || 0,
      currency: session.currency || "usd",
      line_items: [
        {
          name: "Hotel Room",
          description: "Standard booking",
          amount_subtotal: session.amount_subtotal || 0,
          amount_total: session.amount_total || 0,
          currency: session.currency || "usd",
          quantity: 1,
        },
      ],
    };
      console.log("🟢 Creating booking in DB...");
     const savedBooking = await BookingOrder.create(bookingData);
  console.log("✅ Booking saved:", savedBooking._id);
   // 👇 yahan return karo frontend ko simple JSON
    res.json({
      id: session.id,
      amount_total: session.amount_total,
      payment_status: session.payment_status,
      customer_email: session.customer_details?.email || "N/A",
    });

    
 } catch (error) {
    console.error(" Session retrieve error:", error.message);
 }

   
}

