import mqtt from 'mqtt';
import {} from 'dotenv/config';
import SensorService from '#~/api/v1/sensorRecord/services/index.js';

const LIMIT_TEMP = 27;
const LIMIT_HUMIDITY = 80;

class MqttService {
    static mqttClient = null;

    static async connect() {
        if (!MqttService.mqttClient) {
            const clientId = 'client' + Date.now();
            const host = process.env.HIVEMQ_HOST;

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
            };

            try {
                MqttService.mqttClient = mqtt.connect(host, options);

                MqttService.mqttClient.on('error', (err) => {
                    console.log('Error: ', err);
                    MqttService.mqttClient.end();
                    MqttService.mqttClient = null; // Reset mqttClient on error
                });

                MqttService.mqttClient.on('reconnect', () => {
                    console.log('Reconnecting...');
                });

                MqttService.mqttClient.on('message', async function(topic, message) {
                    try{
                        let str = message.toString();
                        let parts = str.split(':');
    
                        if (topic === 'led-bed-room') {
                            // Handle led-bed-room topic
                        } else if (topic === 'temperature') {
                            let temperature = parts[1].trim().split('°')[0];
                            await new SensorService().addValue({
                                value: temperature,
                                limit: LIMIT_TEMP,
                                type: 'temperature',
                            });
                        } else if (topic === 'humidity') {
                            let humidity = parts[1].trim().split('%')[0];
                            await new SensorService().addValue({
                                value: humidity,
                                limit: LIMIT_HUMIDITY,
                                type: 'humidity',
                            });
                        } else if (topic === 'brightness') {
                            // Handle brightness topic
                        }
                    }catch(err)
                    {
                        throw Error(err)
                    }
                    
                });

                MqttService.mqttClient.on('connect', function() {
                    console.log('Đã kết nối tới MQTT broker');

                    MqttService.mqttClient.subscribe('fan', { qos: 0 });
                    MqttService.mqttClient.subscribe('door', { qos: 0 });

                    MqttService.mqttClient.subscribe('light-living-room', { qos: 0 });
                    MqttService.mqttClient.subscribe('light-kitchen', { qos: 0 });

                    MqttService.mqttClient.subscribe('temperature', { qos: 0 });
                    MqttService.mqttClient.subscribe('humidity', { qos: 0 });
                });
            } catch (err) {
                throw Error(err);
            }
        }
    }

    static getMqttClient() {
        return MqttService.mqttClient;
    }
}

export default MqttService;
