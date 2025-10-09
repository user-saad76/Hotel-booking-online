import express from "express";
import { signupUser,signinUser,getMe ,logout} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { confirmPayment, stripePayment } from "../controllers/payment.controller.js";


const server = express();
const router = express.Router()


router.route('/checkout/sessions').post(stripePayment)
router.route('/payment/confirm').post(confirmPayment)

export default router
