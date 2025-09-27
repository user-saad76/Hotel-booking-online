import express from "express";
import 'dotenv/config'
import HotelRoutes from './routes/Hotel.routes.js'
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";
import cors from 'cors'
import UserRoutes from './routes/user.routes.js'

const server = express();
const port =  process.env.PORT || 5000
connectDB().catch((e)=>console.log("Error in Correction",e))



server.use(cors())
server.use(bodyParser.json())
server.use(HotelRoutes)
server.use(UserRoutes)


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
