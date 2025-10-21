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
import AdminUserRoutes from './routes/AdminUser.routes.js';
import http from 'http'
import { Server } from "socket.io";

const server = express();
const port =  process.env.PORT || 5000
connectDB().catch((e)=>console.log("Error in Correction",e))

const serverhttp = http.createServer(server);
const io = new Server(serverhttp,{
  cors:{
    origin:["http://localhost:5173","http://localhost:5174"],
    methods:["GET","POST"],
    credentials:true //frontend origins
  }
});

io.on("connection",(socket)=>{
   
  console.log('Hello',socket.id);
  // socket.emit('abc',{message:'Hello I am updating string'})

  // socket.on('chat',(data)=>{
  //   console.log(socket.id,"sent a message",data.chat);
    
  // })
  
})



server.use(cors({
  origin: ["http://localhost:5173","http://localhost:5174"], // your frontend
  credentials: true            // allow cookies
}))
server.use(express.json());
//server.use(bodyParser.json())
server.use(cookieParser())

server.set("socket", io);
server.use((req, res, next) => {
  req.io = server.get("socket");
  next();
});

server.use(HotelRoutes)
server.use(UserRoutes)
server.use(ReviewRoutes)
server.use("/api",AIRoutes);
server.use(paymentRoutes)
server.use(BookingOrdersRoutes)
server.use(AdminUserRoutes);


 serverhttp.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
