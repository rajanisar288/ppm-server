/**
 * User Routes
 */

import  express  from "express";
const router = express.Router()
import verifyAdmin from "../middlewares/adminMiddleware.js"
import userController from "../controllers/userController.js"
import verifyUser from '../middlewares/userMiddleware.js'

router.post('/user/sign-up' , verifyAdmin  , userController.userRegister)  
router.post('/user/sign-in', userController.userLogin)       
// router.post('/user/sign-in',  userController.userLogin)            
// router.post('/user/profile-update',verifyAdmin,  upload.single('profile'), adminController.updateAdminProfile)         

export default router