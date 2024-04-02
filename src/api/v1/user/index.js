import {Router} from 'express'
import register from './controllers/register.js'
import login from './controllers/login.js'
import getUserInfo from './controllers/getUserInfo.js'


import userAuth from '#~/middleware/userAuth.js'

const user_router = Router()
user_router.post('/register', register)
user_router.post('/login', login)
user_router.get('/information',getUserInfo)


export default user_router
