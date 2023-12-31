/**
 * Register user
 * Login user
 * Update user profile picture
 * update user details
 */
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

const userController = {
  userRegister: async (req, res) => {
    const { name, email, password, dataOfBirth, city, mobileNumber, country } =
      await req.body;
    try {
      if ((name, email, password, dataOfBirth, city, mobileNumber, country)) {
        const user = await userModel.findOne({ email });
        if (!user) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const newUser = await userModel({
            name,
            email,
            password: hashedPassword,
            dataOfBirth,
            address: {
              city,
              country,
            },
            mobileNumber,
          });
          await newUser.save();
          res.status(201).json({
            status: true,
            message: "Account created successfully!",
          });
        } else {
          res.status(409).json({
            status: false,
            message: "email is already exists",
          });
        }
      } else {
        res.status(400).json({
          status: false,
          message:
            "Empty Data: The request body is empty. Please provide the necessary data.",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: false,
        message: `error ${err}`,
      });
    }
  },

  userLogin: async (req, res) => {
    try {
      const { email, password } = await req.body;
      const user = await userModel.findOne({ email });
      console.log(email, password);
      if (!user) {
        res.status(404).json({
          status: false,
          message: "user not found",
        });
      } else {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          const token = await jwt.sign(
            { _id: user._id, email },
            process.env.SECRET_KEY,
            { expiresIn: "20h" }
          );
          user.password = undefined;
          res.status(200).json({
            status: true,
            message: "you have login Successfully",
            result: user,
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
  //Get all Users
  getAllUser: async (req, res) => {
    let usersList = await userModel.find({});
    const users = await usersList.map((user) => (user.password = undefined));
    console.log(usersList.password);
    res.status(200).json({
      status: true,
      message: "success",
      result: usersList,
    });
  },
  //Update User
  updateUser: async (req, res) => {
    let hashedPassword;
    const userId = await req.params.id;
    const { name, email, password, country, city, mobileNumber } =
      await req.body;
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }
      const user = await userModel.findByIdAndUpdate(
        { _id: userId },{$set: {name,email,password: hashedPassword,address: {country,city,},mobileNumber,},}
      );

      if (user) {
        res.status(200).json({
          status: true,
          message: "User updated successfully",
        });
      } else {
        res.status(404).json({
          status: false,
          message: "User not found",
        });
      }
    } catch (err) {
      res.status(404).json({
        status: false,
        message: `Message ${err}`,
      });
    }
  },

  // Delete User
  deleteUser: async (req, res) => {
    const userId = await req.params.id;
    try {
      const deletedUser = await userModel.findByIdAndDelete(userId);
      if (!deletedUser) {
        res.status(404).json({ status: false, message: "User not found" });
      } else {
        res
          .status(200)
          .json({ status: true, message: "User deleted successfully" });
      }
    } catch (err) {
      res.status(400).json({ status: false, message: `${err}` });
    }
  },
};

export default userController;
