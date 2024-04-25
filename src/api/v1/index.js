import {Router} from 'express'
import user_router from './user/index.js'
import device_router from './device/index.js'
import sensor_router from './sensorRecord/index.js'
import notification_router from './notification/index.js'
import voicecmd_router from './voiceCommand/index.js'
import logs_router from './deviceLog/index.js'
import dashboard_router from './dashboard/index.js'

const ver1_router = Router()
ver1_router.use('/user', user_router)
ver1_router.use('/device', device_router)
ver1_router.use('/sensor', sensor_router)
ver1_router.use('/notification', notification_router)
ver1_router.use('/voicecmd', voicecmd_router)
ver1_router.use('/logs', logs_router)
ver1_router.use('/dashboard', dashboard_router)


export default ver1_router
