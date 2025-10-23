import express from "express";
import { isAuthenticated,isAuthorized } from "../middleware/auth.middleware.js";
import { deleteBookingOrderById, getAllBookingOrders, getBookingOrderById, UpdateBookingOrderById } from "../controllers/BookingOrder.controller.js";
const server = express();
const router = express.Router()

router.route('/bookingOrder').get(getAllBookingOrders)
router.route('/bookingOrder/:id').get(getBookingOrderById)
router.route('/bookingOrder/update/:id').put(isAuthenticated,UpdateBookingOrderById)
router.route('/bookingOrder/delete/:id').delete(isAuthenticated,deleteBookingOrderById)


export default router