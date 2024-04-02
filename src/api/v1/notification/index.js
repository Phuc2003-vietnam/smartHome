import {Router} from 'express'
import getNotifications from './controllers/getNotifications.js'


const notification_router = Router()

notification_router.get('/',getNotifications)


export default notification_router
