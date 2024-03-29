import mqtt from 'mqtt'
import {} from 'dotenv/config'
import SensorService from '#~/api/v1/sensorRecord/services/index.js'


const LIMIT_TEMP = 28
const LIMIT_HUMIDITY = 50


async function connect() {
	const clientId = 'client' + Date.now()
	const host = process.env.HIVEMQ_HOST

	// Fetch CA certificate
	const options = {
		username: process.env.HIVEMQ_USERNAME,
		password: process.env.HIVEMQ_PASSWORD,
		keepalive: 60,
		clientId: clientId,
		protocolId: 'MQTT',
		protocolVersion: 4,
		clean: true,
		reconnectPeriod: 1000,
		connectTimeout: 30 * 1000,
	}
	try {
		const mqttClient = await mqtt.connectAsync(host, options)
	} catch (error) {
		console.log('connect failure')
	}

	const mqttClient = mqtt.connect(host, options)

	mqttClient.on('error', (err) => {
		console.log('Error: ', err)
		mqttClient.end()
	})

	mqttClient.on('reconnect', () => {
		console.log('Reconnecting...')
	})

	mqttClient.on('message', function (topic, message) {
		let str = message.toString()
		let parts = str.split(':')

		if (topic === 'led-bed-room') {
		} else if (topic === 'temperature') {
			//Split string
			let temperature = parts[1].trim().split('°')[0]
			new SensorService().addValue(temperature, LIMIT_TEMP, 'temperature')
		} else if (topic === 'humidity') {
			let humidity = parts[1].trim().split('%')[0]
			new SensorService().addValue(humidity, LIMIT_HUMIDITY, 'humidity')
		} else if (topic === 'brightness') {
		}
	})

	mqttClient.on('connect', function () {
		console.log('Đã kết nối tới MQTT broker')

		mqttClient.subscribe('fan', {qos: 0})
		mqttClient.subscribe('door', {qos: 0})

		mqttClient.subscribe('light-living-room', {qos: 0})
		mqttClient.subscribe('light-kitchen', {qos: 0})

		mqttClient.subscribe('temperature', {qos: 0})
		mqttClient.subscribe('humidity', {qos: 0})
	})
}

export default {connect}
