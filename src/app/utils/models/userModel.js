import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  password:{
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
},
  {
    timestamps: true,
  }
)

const USER = mongoose.models.User || mongoose.model("User", userSchema);
export default USER;