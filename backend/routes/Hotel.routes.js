import express from "express";
import {  createNewHotel,getAllHotels,getHotelById,updateHotel,deleteHotel } from "../controllers/Hotel.controller.js";
import upload from '../utils/multer.js'
import { isAuthenticated,isAuthorized } from "../middleware/auth.middleware.js";
const server = express();
const router = express.Router()

router.route('/hotels/add').post( upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 } // allow multiple gallery images
  ]), createNewHotel)
router.route('/hotels').get(getAllHotels)
router.route('/hotel/:id').get(getHotelById)
router.route('/hotel/update/:id').put( isAuthenticated, updateHotel)
router.route('/hotel/delete/:id').delete(isAuthenticated,deleteHotel)


export default router