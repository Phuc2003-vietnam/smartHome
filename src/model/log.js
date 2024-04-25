import mongoose from "mongoose"
const Schema = mongoose.Schema

const deviceLogSchema = Schema (
    {
        deviceLogInfo: {type: String, default: 'default'}
    },
    {
        timestamps: true
    }
)

deviceLogSchema.pre('save', async function(next) {
    if (!this.isNew) {
        return next()
    }
    try {
        const lastLog = await this.constructor.findOne({}, {}, { sort: { 'deviceLog_id': -1 } });
        if (lastLog && lastLog.deviceLog_id) {
          this.deviceLog_id = lastLog.deviceLog_id + 1;
        } else {
          this.deviceLog_id = 1;
        }
        next();
    }
    catch (error) {
        next(error)
    }
});

const DeviceLogs = mongoose.model('DeviceLogs', deviceLogSchema)
export default DeviceLogs