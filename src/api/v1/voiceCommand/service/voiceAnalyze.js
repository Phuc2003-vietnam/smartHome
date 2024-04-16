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

    // Find <state>
    if (command.includes('on') || command.includes('open')) {
        initSet.state = true
    } else {
        initSet.state = false
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

    // Find <level> in case of device is 'fan'
    if (deviceFound[0].type === 'fan') {
        let fanLv = findLevel(command)
        if (fanLv != -1) {
            initSet.state = true
            if (command.includes('increase') || command.includes('higher')) {
                initSet.level = Math.min(deviceFound[0].level + fanLv, 3)
            } else if (command.includes('decrease') || command.includes('lower')) {
                initSet.level = Math.max(deviceFound[0].level - fanLv, 1)
            } else if (command.includes('level')) {
                initSet.level = fanLv
            }
        }
    }

    
    // Call changeDetail to update state & level of device
	var data = await new Device().changeDetail(initSet)
    return data
}

function findLevel(command = '') {
    if (command.includes('one') || command.includes(' 1 ')) return 1
    if (command.includes('two') || command.includes(' 2 ')) return 2
    if (command.includes('three') || command.includes(' 3 ')) return 3
    return -1
}

export default voiceAnalyze