import {Router} from 'express'
import user_router from './user/index.js'
import device_router from './device/index.js'
// import student_router from './student/index.js'
// import staff_router from './staff/index.js'
// import printer_router from './printer/index.js'

const ver1_router = Router()
ver1_router.use('/user', user_router)
ver1_router.use('/device', device_router)

// ver1_router.use('/spso', spso_router)
// ver1_router.use('/student', student_router)
// ver1_router.use('/staff', staff_router)
// ver1_router.use('/printer', printer_router)

export default ver1_router
