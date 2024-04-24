import mongoose from 'mongoose'
const Schema = mongoose.Schema

const dashBoardSchema = new Schema(
	{

		type: {type: String, enum: ['temperature', 'humidity'], default: 'null'},
		hourlyValue: [{
            value: {type: Number}, 
            time: {type: String}
        }],
		lowest:{type: Number},
		highest:{type: Number},
		average:{type: Number},

	},
	{
		timestamps: true,
	}
)


const DashBoard = mongoose.model('DashBoard', dashBoardSchema)

export default DashBoard
