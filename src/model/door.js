import mongoose from "mongoose";
const Schema = mongoose.Schema;

const doorSchema = new Schema(
  {
    door_id: { type: Number, unique: true },
    name: { type: String, default: 'default' },
    state: { type: Boolean, default: false },
    mode: { type: String, enum: ['auto', 'manual'], default: 'auto' },
    close_time: { type: Number, default: true },
  },
  {
    timestamps: true,
  }
);

// Auto-increment door_id
doorSchema.pre('save', async function(next) {
  if (!this.isNew) {
    return next();
  }
  try {
    const lastDoor = await this.constructor.findOne({}, {}, { sort: { 'door_id': -1 } });
    if (lastDoor && lastDoor.door_id) {
      this.door_id = lastDoor.door_id + 1;
    } else {
      this.door_id = 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Door = mongoose.model("Door", doorSchema);

export default Door;
