import notification from "#~/model/notification.js"
import {io} from '#~/config/socketIo.js'

async function checkAllNotifications({
    user_id
}) {
    let checkAll = await notification.updateMany(
        {
            'receiver.user_id': user_id,
        },
        {
            $set: { seen: true }
        },
        {returnDocument: 'after'}
    ).sort({ actionTime: -1 })
    .then(() => notification.find({ 'receiver.user_id': user_id }))

    //Notification data
    const notice_data = {
        message: 'Call the notifications list API to fetch => change number unread news and update list news',
        reason: 'SPSO/Staff edit the printer',
        target: 'spso staff'
    }
    io.emit('update-notification-list', notice_data)

    return checkAll
}

export default checkAllNotifications