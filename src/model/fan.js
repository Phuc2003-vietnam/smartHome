import mongoose from "mongoose";
const Schema = mongoose.Schema;

const fanSchema = new Schema(
  {
    fan_id: { type: Number, unique: true },
    name: { type: String, default: 'default' },
    state: { type: Boolean, default: false },
    mode: { type: String, enum: ['auto', 'manual', 'scheduled'], default: 'auto' },
    level: { type: Number, default: true },
    start: { type: Date, default: false },
    end: { type: Date, default: 1 },
  },
  {
    timestamps: true,
  }
);

// Auto-increment fan_id
fanSchema.pre('save', async function(next) {
  if (!this.isNew) {
    return next();
  }
  try {
    const lastFan = await this.constructor.findOne({}, {}, { sort: { 'fan_id': -1 } });
    if (lastFan && lastFan.fan_id) {
      this.fan_id = lastFan.fan_id + 1;
    } else {
      this.fan_id = 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Fan = mongoose.model("Fan", fanSchema);

export default Fan;
