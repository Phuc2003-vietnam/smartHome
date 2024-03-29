import mongoose from 'mongoose'
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema
const user = new Schema(
	{
		email: {type: String, default: null, maxLength: 100},
		password: {type: String, default: null},
		username: {type: String, default: null, maxLength: 50},
	},
	{
		timestamps: true,
	}
)
user.pre('save',async function(next){			
	const user = this; 			//arrow function not work with this
	try {
	  // Generate a salt and hash the password
	  const saltRounds = 10;
	  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  
	  // Replace the plaintext password with the hashed one
	  user.password = hashedPassword;
	  next();
	} catch (error) {
	  next(error);
	}
  })
export default mongoose.model('Users', user)
