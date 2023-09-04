import mongoose  from 'mongoose';

const ticketSchema = new mongoose.Schema({
    
    isActive:Boolean,
    ticketDesc:String,
    image:String,
    ticketTitle:String,
    userId:String,
    ticketDetail:[]
},{ timestamps: true });



const ticket = mongoose.model('ticket',  ticketSchema, 'ticketModel');
export default ticket