	import express from 'express'
	import cors from 'cors'
	import router from '../routers/index.js'

	import {} from "dotenv/config";
	import db from "./mongoDB.js";
	import MqttService from "./hivemq.js";
	import {createServer} from 'http'

	const port =  8000

	const configExpressApp = async (app) => {
		const httpServer = createServer(app)
		db.connect()
		db.reInitSchedule()
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
