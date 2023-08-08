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
    userRegister: async (req, res)=>{
     const {name , email ,password, profile, dataOfBirth, address, mobileNumber, role} = await req.body
     try {
        if(name, email, password){
            const user = await userModel.findOne({email})
            if(!user){
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const newUser = await userModel({
                    name,
                    email,
                    password: hashedPassword,
                    profile,
                    dataOfBirth,
                    address,
                    mobileNumber,
                    role,
                  });
                  await newUser.save();
                  res.status(201).json({
                    status: true,
                    message: "Account created successfully!",
                  });
            }else{
                res.status(409).json({
                    status: false,
                    message: "email is already exists",
                  });
            }

        }else{
            res.status(400).json({
                status: false,
                message: "Empty Data: The request body is empty. Please provide the necessary data.",
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
            const token = await jwt.sign({ _id: user._id, email },process.env.SECRET_KEY,{ expiresIn: "20h" });
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
    }
}

export  default userController