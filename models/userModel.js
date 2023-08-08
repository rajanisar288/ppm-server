import mongoose  from 'mongoose';

const userSchema = new mongoose.Schema({
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
  profile: {
    type:String,
    default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
     
  },
  dataOfBirth: {
    type: String,
  },
  address:{
      country:{
        type:String,
        default:'xyz'
      },
      city:{
        type:String
      }

  },
  mobileNumber:{
    type:Number
  },
  role:{
    type:String,
    default:"user"
  },
}, { timestamps: true });



const userModel = mongoose.model('userModel', userSchema , 'userModel');
export default userModel