import express from 'express'
import cors from 'cors'
import router from '../routers/index.js'
import {initializeApp} from 'firebase/app'
import {} from 'dotenv/config'
import db from './mongoDB.js'
import MqttService from './hivemq.js'
import {createServer} from 'http'
import DashboardService from '#~/api/v1/dashboard/services/index.js'
// import * as FirebaseService from './firebase.js'
const port = 8000
import { Expo } from 'expo-server-sdk';
import { firebaseConfig } from './firebase.js'
const configExpressApp = async (app) => {
	const httpServer = createServer(app)
	db.connect()
	db.reInitSchedule()
	initializeApp(firebaseConfig)
	// new DashboardService().computeAverageHourly()
	MqttService.connect()
	app.set('port', port)
	app.use(cors())
	app.use(express.json())
	app.use(express.urlencoded({extended: true}))
	app.use(router)
	app.use((error, req, res, next) => {
		console.log(error.message)
		const status = error.status || 500
		const message = error.message
		const data = error.data
		res.status(status).json({message: message, data: data})
	})
	//handle error middleware
	app.get('/', async function (req, res) {
		try {
			res.status(200).json({message: 'OK'})
		} catch (err) {
			res.status(500).json({message: err.message})
		}
	})
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
	// configSwagger(app)
	// initializeSocketServer(httpServer)
	httpServer.listen(app.get('port'), async () => {
		try {
			console.log(`start server at port: ${app.get('port')}`)
		} catch (err) {
			console.log(err)
		}
	})
	return app
}

export default configExpressApp
