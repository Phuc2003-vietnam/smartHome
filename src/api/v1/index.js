import {Router} from 'express'
import user_router from './user/index.js'
import device_router from './device/index.js'
import sensor_router from './device/index.js'

const ver1_router = Router()
ver1_router.use('/user', user_router)
ver1_router.use('/device', device_router)
ver1_router.use('/sensor', device_router)


export default ver1_router
