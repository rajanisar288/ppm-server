import mongoose  from 'mongoose';

const adminSignupScheme = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  email: {
    type: String,
    unique: true,
    required:true
  },
  password: {
    type: String,
    // select:false,
    required:true
  },
//   createdAt: {
//     type: Date,
//     default: Date.now()
//   },
  profile: {
    type:String,
    default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
     
  },
  description:{
    type:String,
  },
  profession: {     
    type:String,   
  },
  status: {
    type:String,
  },
  dataOfBirth: {
    type: Date,
  },
  address:{
      country:{
        type:String,
        default:'xyz'
      },
      city:{
        type:String
      },
      province:{
        type:String
      },
      zipCode:{
        type:Number
      }

  },
  mobileNumber:{
    type:Number
  },
  role:{
    type:String
  },
}, { timestamps: true });



const adminModel = mongoose.model('adminModel', adminSignupScheme, 'adminModel');
export default adminModel