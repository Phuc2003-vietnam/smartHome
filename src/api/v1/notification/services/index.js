import getNotifications from "./getNotifications.js"
import addNotification from "./addNotification.js"
import registerPushToken from "./registerPushToken.js"
import sendSample from "./sendSample.js"
import sendNotiFirebase from "./sendNotiFirebase.js"

class NotificationService {
    getNotifications=getNotifications
    addNotification=addNotification
    registerPushToken=registerPushToken
    sendSample=sendSample
    sendNotiFirebase=sendNotiFirebase
}

export default NotificationService