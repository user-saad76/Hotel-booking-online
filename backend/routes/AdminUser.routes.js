import express from "express";
import { isAuthenticated, isAuthorized } from "../middleware/auth.middleware.js";
import { signinAdminUser, signupAdminUser ,Admin,logout} from "../controllers/AdminUser.controller.js";


const server = express();
const router = express.Router()


router.route('/admin-user/sign-up').post(signupAdminUser)
 router.route('/admin-user/signin').post(signinAdminUser)
 router.route('/admin-user/me').get(isAuthenticated,Admin)
 router.route('/admin-user/logout').post(logout)

export default router
