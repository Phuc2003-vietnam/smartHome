import mongoose from "mongoose";
import {} from "dotenv/config";
import device from '#~/model/device.js'
async function connect() {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_DB);
        console.log("connect successfuly");
    }
    catch(error){
        console.log("connect failure");
    }
}

async function reInitSchedule() {
    try {
        await device
			.findOneAndUpdate(
				{type:'fan'},
				{
					$set: {schedule:[]},
				},
			)
        await device
			.findOneAndUpdate(
				{type:'door'},
				{
					$set: {schedule:[]},
				},
			)
    }
    catch(error){
        console.log("connect failure");
    }
}
export default {connect,reInitSchedule}
