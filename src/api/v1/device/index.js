import {Router} from 'express'
import getDevices from './controllers/getDevices.js'
import changeDetail from './controllers/changeDetail.js'

const user_router = Router()

user_router.get('/general-information',getDevices)
user_router.put('/details',changeDetail)


export default user_router
