import {Router} from 'express'
import getNotifications from './controllers/getNotifications.js'
import registerPushToken from './controllers/registerPushToken.js'
import sendSample from './controllers/sendSample.js'


const notification_router = Router()

notification_router.get('/',getNotifications)
notification_router.post('/registerPushToken',registerPushToken)
notification_router.post('/samples',sendSample)

// app.post('/registerPushToken', async (req, res) => {
	// 	const {userId, token} = req.body
	// 	await FirebaseService.saveToken(userId, token)
	// 	res.status(200).send('success')
	// })
	// app.post('/samples', async (req, res) => {
	// 	const {userId} = req.body
	// 	const expo = new Expo()
	// 	const {token} = await FirebaseService.getToken(userId)
	// 	expo.sendPushNotificationsAsync([
	// 		{
	// 			to: token,
	// 			title: 'soil level low',
	// 			body: 'water please',
	// 		},
	// 	])
	// 	res.status(200).send('success')
	// })
export default notification_router
