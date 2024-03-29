import notification from "#~/model/notification.js"

async function getNotifications({
    user_id
}) {

    //Get all user notifications and sort latest -> oldest
    let allNotices = await notification
        .find({
            'receiver.user_id': user_id,
        })
        .sort({actionTime: -1})
    
    //Count news notifications
    let news = 0
    allNotices.forEach((ele) => {
        news += (ele.seen) ? 0 : 1
    })
    

    return {
        allNotices,
        news
    }

}

export default getNotifications