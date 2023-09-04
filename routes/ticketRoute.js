import express from "express";
const router = express.Router();
import ticketController from "../controllers/ticketController.js"
import {ticketImg} from "../middlewares/profileMiddleware.js"
import verifyAdmin from '../middlewares/adminMiddleware.js'
import verifyUser from "../middlewares/userMiddleware.js"

router.post("/ticket/create", verifyUser,  ticketImg.single("image"), ticketController.createTicket);
router.post("/ticket/sendMessage/:id", verifyAdmin, ticketController.sendTicket)
router.get('/ticket/all' , ticketController.getAllTickets)
// router.post("/user/sign-in", userController.userLogin);


export default router


