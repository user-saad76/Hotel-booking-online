import express from "express";
import { isAuthenticated,isAuthorized } from "../middleware/auth.middleware.js";
import { CreateComplainMessages, GetComplainMessages } from "../controllers/ComplainMessages.controller.js";

const server = express();
const router = express.Router()

router.route('/report/complain').post(CreateComplainMessages)
router.route('/report/getcomplain').get(GetComplainMessages)



export default router