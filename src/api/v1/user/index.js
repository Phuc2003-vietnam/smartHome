import {Router} from 'express'
// import login from './controllers/login.js'
import register from './controllers/register.js'
import login from './controllers/login.js'
// import refreshAccessToken from './controllers/refreshAccessToken.js'
import getUserInfo from './controllers/getUserInfo.js'
// import getSpsoStaff from './controllers/getSpsoStaff.js'
// import getConversationId from './controllers/getConversationId.js'
// import addMessage from './controllers/addMessage.js'
// import getMessage from './controllers/getMessage.js'

import userAuth from '#~/middleware/userAuth.js'

const user_router = Router()
user_router.post('/register', register)
user_router.post('/login', login)
user_router.get('/user-information',getUserInfo)
// user_router.get('/message-list', userAuth,getSpsoStaff)
// user_router.get('/conversation-id', userAuth,getConversationId)
// user_router.post('/message', userAuth,addMessage)
// user_router.get('/message', userAuth,getMessage)

export default user_router
