import mongoose from 'mongoose'
const Schema = mongoose.Schema
const notificationSchema = new Schema(
	{
        description: { type: String, default: 'default' },
		
	},
	{
		timestamps: true,
	}
)
notificationSchema.pre('save', async function(next) {
    if (!this.isNew) {
      return next();
    }
    try {
      const lastNoti = await this.constructor.findOne({}, {}, { sort: { 'notification_id': -1 } });
      if (lastNoti && lastNoti.notification_id) {
        this.notification_id = lastNoti.notification_id + 1;
      } else {
        this.notification_id = 1;
      }
      next();
    } catch (error) {
      next(error);
    }
  });
export default mongoose.model('Notifications', notificationSchema)
