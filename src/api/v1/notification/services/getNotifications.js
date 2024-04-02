import notification from '#~/model/device.js'


async function getNotifications() {
	try {
		var notifications = await notification.find({}).sort({actionTime: -1}).lean()
		return notifications
	} catch (err) {
		return Promise.reject({status: 401, message: err})
	}
}
export default getNotifications
