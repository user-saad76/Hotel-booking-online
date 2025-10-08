import express from "express";
import { signupUser,signinUser,getMe ,logout} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { stripePayment } from "../controllers/payment.controller.js";


const server = express();
const router = express.Router()


router.route('/checkout/sessions').post(stripePayment)

export default router
