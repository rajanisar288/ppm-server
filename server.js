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
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.use('/tickets', express.static(path.join(__dirname, 'tickets')));
app.use('/profiles', express.static(path.join(__dirname, 'profiles')));


import adminRoutes from "./routes/adminRoutes.js"
import userRoutes from  "./routes/userRoutes.js"
import ticketRouter from "./routes/ticketRoute.js"

// handle route
// Admin Routes
app.use('/api/auth' , adminRoutes)
app.use('/api/auth' , userRoutes)
app.use('/api', ticketRouter)

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