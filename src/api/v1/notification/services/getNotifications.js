import notification from '#~/model/notification.js'


async function getNotifications() {
	try {
		var notifications = await notification.find({}).sort({createdAt: -1}).lean()
		return notifications
	} catch (err) {
		return Promise.reject({status: 401, message: err})
	}
}
export default getNotifications
