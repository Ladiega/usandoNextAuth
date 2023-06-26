import { Schema, model, models } from "mongoose"; //permite definir que queremas guardar Datos

const userSchema = new Schema({
  email:{
    type:String,
    unique: true,
    require:[true,'Email is required'],
    match:[ /^\w+([\.-_+]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/,
      'Email is not valid'
    ]
  },
  password:{
    type: String,
    require: [true,'Password is required'],
    select: false
  },
  fullname:{
    type:String,
    require:[true, 'Full name is required'],
    minLength:[3, 'Fullname must be at least 3 characters'],
    maxLength:[50, 'Fullname must be at most 50 characters']

  },
});
const User = models.User || model('User', userSchema)
export default User;