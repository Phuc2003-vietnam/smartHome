import Device from "../../device/services/index.js";
import device from '#~/model/device.js'

// <command> is all converted into lowercase
async function voiceAnalyze({command = ''}) {
    // Only need to turn on/off so we set other attributes default
    var initSet = {}
	initSet.close_time = -1
	initSet.scheduleTime = []
	initSet.isScheduleDeleted = false
	initSet.isDoorScheduleDeleted = false
	initSet.isAuto = -1

    // Initial <level> for optional
    initSet.level = -1

    // Find <state>
    if (command.includes('on') || command.includes('open')) {
        initSet.state = true
    } else if (command.includes('off') || command.includes('close')) {
        initSet.state = false
    } else {
        return Promise.reject({status: 400, message: 'No state included'})
    }

    // Find <topic> 
    if (command.includes('fan')) {
        initSet.topic = 'fan'
    } else if (command.includes('door')) {
        initSet.topic = 'door'
    } else if (command.includes('light')) {
        if (command.includes('kitchen')) {
            initSet.topic = 'kitchen-light'
        } else if (command.includes('living')) {
            initSet.topic = 'living-room-light'
        } else {
            return Promise.reject({status: 400, message: 'Device not found'})
        }
    } else {
        return Promise.reject({status: 400, message: 'Device not found'})
    }
    
    // Find <device_id>
    let query = {}
    query.topic = initSet.topic
    var deviceFound = await device.find(query).lean()
    try {
        initSet.device_id = deviceFound[0].device_id
    }
    catch (err) {
        return Promise.reject({status: 400, message: 'Device not found'})
    }
    
    // Call changeDetail to update state & level of device
	var data = await new Device().changeDetail(initSet)
    return data
}

export default voiceAnalyze