import express from "express";
import { isAuthenticated,isAuthorized } from "../middleware/auth.middleware.js";
import { ComplainMessagesDelete, CreateComplainMessages, GetComplainMessages } from "../controllers/ComplainMessages.controller.js";

const server = express();
const router = express.Router()

router.route('/report/complain').post(CreateComplainMessages)
router.route('/report/getcomplain').get(GetComplainMessages)
router.route('/report/complainDelete/:id').delete(ComplainMessagesDelete)


export default router