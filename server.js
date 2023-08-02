import dotenv from 'dotenv';
dotenv.config();
import express  from "express";
import cors from "cors";
import databaseConnection from "./config/dataBase.js"
const app = express();
app.use(cors())
const PORT = process.env.PORT || 5000;
databaseConnection(process.env.URL)
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

import adminRoutes from "./routes/adminRoutes.js"

// handle route
// Admin Routes
app.use('/api/auth' , adminRoutes)
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