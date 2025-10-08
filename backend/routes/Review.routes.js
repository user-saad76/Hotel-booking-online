import express from "express";
import { createReview ,getAllReviews} from "../controllers/review.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";



const router = express.Router()


router.route('/review').post(createReview)
router.route('/getReview').get(getAllReviews);


export default router
