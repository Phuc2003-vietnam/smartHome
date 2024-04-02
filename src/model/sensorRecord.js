import mongoose from "mongoose";
const Schema = mongoose.Schema;

const sensorRecordSchema = new Schema(
  {
    type: { type: String, enum: ['temperature', 'humidity', 'brightness'], default: 'null' },
    value: { type: Number, default: true },
    limit: { type: Number, default: false },
  },
  {
    timestamps: true,
  }
);

// Auto-increment fan_id
sensorRecordSchema.pre('save', async function(next) {
  if (!this.isNew) {
    return next();
  }
  try {
    const lastSensorRecord = await this.constructor.findOne({}, {}, { sort: { 'sensorRecord_id': -1 } });
    if (lastSensorRecord && lastSensorRecord.sensorRecord_id) {
      this.sensorRecord_id = lastSensorRecord.sensorRecord_id + 1;
    } else {
      this.sensorRecord_id = 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const SensorRecord = mongoose.model("SensorRecord", sensorRecordSchema);

export default SensorRecord;
 