/**
 * Admin Routes
 */

import  express  from "express";
const router = express.Router()
import adminController from "../controllers/adminController.js"
import {upload} from '../middlewares/profileMiddleware.js'
import verifyAdmin from '../middlewares/adminMiddleware.js'

router.post('/admin/sign-up' , adminController.adminRegister )         
router.post('/admin/sign-in',  adminController.adminLogin )            
router.post('/admin/profile-update',verifyAdmin,  upload.single('profile'), adminController.updateAdminProfile)         

export default router