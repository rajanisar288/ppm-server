/**
 * Admin Routes
 */

import  express  from "express";
const router = express.Router()
import {adminController , updateAdminProfile} from "../controllers/adminController.js"
import upload from '../middlewares/profileMiddleware.js'
import verifyAdmin from '../middlewares/adminMiddleware.js'

router.post('/sign-up' ,adminController.adminRegister )         //Register Route
router.post('/sign-in', adminController.adminLogin )            //Login Route
router.post('/admin-profile-update',verifyAdmin,  upload.single('profile'), adminController.updateAdminProfile)         //Update Profile Route

export default router