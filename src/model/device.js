import mongoose from 'mongoose'
const Schema = mongoose.Schema

const deviceSchema = new Schema(
	{
		device_id: {type: Number, unique: true},
		name: {type: String, default: 'default'},
		state: {type: Boolean, default: false},
		mode: {type: String, enum: ['auto', 'manual', 'scheduled'], default: 'auto'},
		level: {type: Number, default: true},
		type: {type: String, enum: ['fan', 'door', 'light'], default: 'auto'},
		schedule: [
			{
				schedule_id:{type:String,unique:true},
				start: {type: Date, default: Date.now},
				end: {type: Date, default: Date.now},
				level: {type: Number, default: 1}
			},
		],
	},
	{
		timestamps: true,
	}
)

// Auto-increment fan_id
deviceSchema.pre('save', async function (next) {
	if (!this.isNew) {
		return next()
	}
	try {
		const lastDevice = await this.constructor.findOne(
			{},
			{},
			{sort: {device_id: -1}}
		)
		if (lastDevice && lastDevice.device_id) {
			this.device_id = lastDevice.device_id + 1
		} else {
			this.device_id = 1
		}
		next()
	} catch (error) {
		next(error)
	}
})

const Device = mongoose.model('Device', deviceSchema)

export default Device
