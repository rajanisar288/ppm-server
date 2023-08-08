/**
 * Register Admin
 * Login Admin
 * Update Admin profile picture
 * update Admin details
 */

import jwt from "jsonwebtoken";
import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt";

const adminController = {
  //Register Admin
  adminRegister: async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        profile,
        description,
        status,
        dataOfBirth,
        address,
        mobileNumber,
        role,
      } = await req.body;
      if (
        email != null &&
        email != undefined &&
        password != null &&
        password != undefined &&
        name != null &&
        name != undefined
      ) {
        const isMatch = await adminModel.findOne({ email: email });
        if (isMatch) {
          res.status(409).json({
            status: false,
            message: "email is already exists",
          });
        } else {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const adminObject = await adminModel({
              name,
              email,
              password: hashedPassword,
              profile,
              description,
              status,
              dataOfBirth,
              address,
              mobileNumber,
              role,
            });
            await adminObject.save();
            res.status(201).json({
              status: true,
              message: "Account created successfully!",
            });
          } catch (error) {
            res.status(400).json({
              status: false,
              message: error,
            });
          }
        }
      } else {
        res.status(400).json({
          status: false,
          message:
            "Empty Data: The request body is empty. Please provide the necessary data.",
        });
      }
    } catch (err) {
      res.status(400).json({
        status: false,
        message: `error ${err}`,
      });
    }
  },

  //Login Admin
  adminLogin: async (req, res) => {
    try {
      const { email, password } = await req.body;
      const admin = await adminModel.findOne({ email });
      console.log(email, password);
      if (!admin) {
        res.status(404).json({
          status: false,
          message: "user not found",
        });
      } else {
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (passwordMatch) {
          const token = await jwt.sign(
            { _id: admin._id, email },
            process.env.SECRET_KEY,
            { expiresIn: "20h" }
          );
          admin.password = undefined;
          res.status(200).json({
            status: true,
            message: "you have login Successfully",
            result: admin,
            token: token,
          });
        } else {
          res.status(401).json({
            status: false,
            message: "Invalid credentials.",
          });
        }
      }
    } catch (err) {
      res.status(400).json({
        status: false,
        message: `${err}`,
      });
    }
  },

 //Update Admin Profile
  updateAdminProfile: async (req, res) => {
    const profileUrl = await req.file.path;
    const admin = await adminModel.updateOne(
      { role: "admin" },
      {
        $set: { profile: profileUrl },
      }
    );
    res.status(200).json({
      status: true,
      message: "image is uploaded",
    });
  },

};

export default adminController