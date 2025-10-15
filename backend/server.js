import express from "express";
import 'dotenv/config'
import HotelRoutes from './routes/Hotel.routes.js'
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";
import cors from 'cors'
import UserRoutes from './routes/user.routes.js'
import ReviewRoutes from './routes/Review.routes.js'
import cookieParser from "cookie-parser";
import AIRoutes from "./routes/ai.routes.js";
import paymentRoutes from './routes/payment.routes.js';
import BookingOrdersRoutes from'./routes/BookingOrders.routes.js';
import AdminUserRoutes from './routes/AdminUser.routes.js'
const server = express();
const port =  process.env.PORT || 5000
connectDB().catch((e)=>console.log("Error in Correction",e))



server.use((req, res, next) => {
  console.log("Request:", req.method, req.url);
  next();
});


server.use(cors({
  origin: ["http://localhost:5173","http://localhost:5174"], // your frontend
  credentials: true            // allow cookies
}))
server.use(express.json());
//server.use(bodyParser.json())
server.use(cookieParser())
server.use(HotelRoutes)
server.use(UserRoutes)
server.use(ReviewRoutes)
server.use("/api",AIRoutes);
server.use(paymentRoutes)
server.use(BookingOrdersRoutes)
server.use(AdminUserRoutes);






console.log(" OpenAI API Key Loaded:", process.env.OPENAI_API_KEY ? "Yes" : "No");



server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
