import mongoose from 'mongoose';
const userSchema= new mongoose.Schema({
        name:{
                type:String,
                required:true,
                min:6,
                max:225,
        },
        email:{
                type:String,
                required:true,
                min:6,
                max:225,

        }
        ,
        password:{
                type:String,
                required:true,
                min:6,
                max:225,
        },
        date:{
                type:Date,
                default:Date.now
        }
});
const  iser = mongoose.model('user',userSchema);
export default iser;