import notification from '#~/model/notification.js'

async function addNotification({description}) {
	notification.create({description})
    return
}

export default addNotification
