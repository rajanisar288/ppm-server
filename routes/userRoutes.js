/**
 * User Routes
 */

import express from "express";
const router = express.Router();
import verifyAdmin from "../middlewares/adminMiddleware.js";
import userController from "../controllers/userController.js";
import verifyUser from "../middlewares/userMiddleware.js";


router.post("/user/sign-up", verifyAdmin, userController.userRegister);
router.post("/user/sign-in", userController.userLogin);
router.get("/user/all-users", verifyAdmin, userController.getAllUser);
router.post("/user/update-user/:id", verifyAdmin, userController.updateUser);
router.delete("/user/delete-user/:id", verifyAdmin, userController.deleteUser);      
    

export default router