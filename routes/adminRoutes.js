import  express  from "express";
const router = express.Router()
import adminController from "../controllers/adminController.js"

router.post('/sign-up', adminController.adminRegister )
router.post('/sign-in', adminController.adminLogin )

export default router