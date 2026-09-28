import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    // name:{type:Number, trim:true},
    email:{type:String, unique:true},
    password:{type:Number, trim:true},
    isLoggedIn:{type:Boolean, default:false}
})

const User = mongoose.model("User", userSchema)

export default User;