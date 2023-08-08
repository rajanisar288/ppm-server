import dotenv from 'dotenv';
dotenv.config();
import express  from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import databaseConnection from "./config/dataBase.js"
const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;
databaseConnection(process.env.URL)


import adminRoutes from "./routes/adminRoutes.js"
import userRoutes from  "./routes/userRoutes.js"

// handle route
// Admin Routes
app.use('/api/auth' , adminRoutes)
app.use('/api/auth' , userRoutes)
app.get('/', (req, res) =>{
    res.send({
        message:"wellcome to ppm server"
    })
})


/*
..######..########.########..##.....##.########.########.
.##....##.##.......##.....##.##.....##.##.......##.....##
.##.......##.......##.....##.##.....##.##.......##.....##
..######..######...########..##.....##.######...########.
.......##.##.......##...##....##...##..##.......##...##..
.##....##.##.......##....##....##.##...##.......##....##.
..######..########.##.....##....###....########.##.....##
*/
app.listen(PORT, ()=>console.log('app running on port ', PORT));