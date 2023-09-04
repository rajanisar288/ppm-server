
import ticket from "../models/ticketModel.js";

const ticketController = {
    createTicket: async (req , res)=>{
        const { userId, ticketDesc , ticketTitle} = await req.body
        const image =await  req.file 
        try {
          if( ticketDesc ,image , userId){
            const createTicket = await ticket({
              userId,
              ticketDesc,
              ticketTitle,
              image:`http://localhost:7000/${image.path}`
            });
            await createTicket.save()
            res.send({
                status:true,message:"Success", result:createTicket
            })
          }else{
            return res.send({
              status:false,
              message:`Data is not showing`
         })
          }
         

        } catch (error) {
           return res.send({
                status:false,
                message:`${error}`
           })
        }
    },
    //send Ticket By Admin
    sendTicket: async (req ,res)=>{
        const ticketId = await req.params.id;
        const {senderId , senderRole , message} = await req.body
        try {
          const currentTicket = await ticket.findById(ticketId)
          if(currentTicket){
            const newMessage = {
              senderId:senderId,
              message:message,
              senderRole:senderRole,
              messageSummary:Date.now()
            }
            currentTicket.ticketDetail.push(newMessage)
            await currentTicket.save()
            res.send({
              message:"Success",
              result:currentTicket
            })
          }
        } catch (error) {
          res.send({
            status:false,
            message:`${error}`
          })
        }
    },

    //Get All Tickets
    getAllTickets: async (req, res)=>{
      try {
        
      } catch (error) {
        
      }
    }
};

export default ticketController;
