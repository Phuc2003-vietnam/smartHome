import {Router} from 'express'
import getValue from './controllers/getValue.js'

import userAuth from '#~/middleware/userAuth.js'

const sensor_router = Router()
sensor_router.get('/values', getValue)

export default sensor_router
