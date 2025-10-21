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
     success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}&checkIn=${encodeURIComponent(bookingData.checkIn)}&checkOut=${encodeURIComponent(bookingData.checkOut)}`,
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
 
export const confirmPayment = async (req, res, next) => {
  try {
    const { sessionId,checkIn, checkOut } = req.body;
    console.log('🟢 Received sessionId:', sessionId);
    console.log('🟢 Received checkIn:',checkIn);
     console.log('🟢 Received checkOut:',checkOut);
    

    if (!sessionId) {
      return res.status(400).json({ error: "Session ID is required." });
    }

    // ✅ Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'customer'],
    });

    if (!session) {
      return res.status(404).json({ error: "Stripe session not found." });
    }

    console.log('💳 Stripe Session Retrieved:', session.id);
    console.log('🔍 Payment status:', session.payment_status);
    console.log('💰 Total amount:', session.amount_total);

    // ✅ Prepare object that matches schema
    const bookingData = {
      // Optional: add these only if you have user/hotel references uncommented in your schema
      // userId: req?.user?._id || "671e41bdbf3d6c001234abcd", // test fallback
      // hotelId: "671e41c3bf3d6c001234dcba", // test fallback

    checkInDate: new Date(checkIn),
    checkOutDate: new Date(checkOut),
      totalNights: 1,
      totalGuests: 1,

      stripeSessionId: session.id,
      paymentStatus: session.payment_status || "pending",
      paymentIntentId: session.payment_intent?.id || null,

      customer_email:
        session.customer_details?.email ||
        session.customer_email ||
        "unknown@example.com",
      customer_name: session.customer_details?.name || "Unknown",
      customer_phone: session.customer_details?.phone || "N/A",

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
          price_data: {
            unit_amount: session.amount_total || 0,
            currency: session.currency || "usd",
          },
        },
      ],
    };

    console.log("🧾 Booking data prepared for DB:", bookingData);

    // ✅ Save booking to MongoDB
    try {
      const savedBooking = await BookingOrder.create(bookingData);
      console.log("✅ Booking saved successfully:", savedBooking._id); 

      const io = req.io; // ✅ ab req.io me socket instance mil gaya
       console.log("🔌 Socket instance found:", !!io);
      io.emit("new-order", savedBooking); // consistent event name
     
      

      // ✅ Send clean response to frontend
      return res.json({
        success: true,
        message: "Booking stored successfully",
        bookingId: savedBooking._id,
        payment_status: session.payment_status,
        amount_total: session.amount_total,
        customer_email: bookingData.customer_email,
         checkInDate: bookingData.checkIn,
         checkOutDate: bookingData.checkOut
      });
    } catch (dbError) {
      console.error("❌ Booking save failed:", dbError.message);
      return res
        .status(500)
        .json({ error: "Failed to save booking in database", details: dbError.message });
    }
  } catch (error) {
    console.error("❌ Session retrieve error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
