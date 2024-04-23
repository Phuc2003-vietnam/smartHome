import Device from "../../device/services/index.js";
import device from '#~/model/device.js'
import { query } from "express";

// <command> is all converted into lowercase
async function voiceAnalyze({command = ''}) {
    // Set init value for changeDetail()
    var initSet = {}
    initSet.device_id = -1
	initSet.state = -1
	initSet.level = -1
	initSet.close_time = -1
	initSet.scheduleTime = []
	initSet.isScheduleDeleted = false
	initSet.isDoorScheduleDeleted = false
	initSet.topic = -1
	initSet.isAuto = -1
    
    // Return data of all updated devices
    var returnData = []
    
    try {
        // Check for deviceType = light
        if (command.includes('light') || command.includes('lights')) {
            // Check state
            if (command.includes('on')) initSet.state = true
            else if (command.includes('off')) initSet.state = false
            else return Promise.reject({status: 400, message: 'Invalid Action'})
            // Find any device included in command
            var isAll = false
            if (command.includes('all')) isAll = true
            let query = {}
            query.type = 'light'
            var deviceFound = await device.find(query).lean()
            if (deviceFound.length == 0) return Promise.reject({status: 400, message: 'No Device Found'})
            else {
                for (let i = 0; i < deviceFound.length; i++) {
                    if (isAll || command.includes(deviceFound[i].name.toLowerCase())) {
                        initSet.device_id = deviceFound[i].device_id
                        initSet.topic = deviceFound[i].topic
                        // Update state of device and include device data into result
                        returnData.push(await new Device().changeDetail(initSet))
                    }
                }
            }
        }
        // Check for deviceType = door
        else if (command.includes('door') || command.includes('doors')) {
            // Check state
            if (command.includes('open')) initSet.state = true
            else if (command.includes('close')) initSet.state = false
            else return Promise.reject({status: 400, message: 'Invalid Action'})
            // Find any device included in command
            var isAll = false
            if (command.includes('all')) isAll = true
            let query = {}
            query.type = 'door'
            var deviceFound = await device.find(query).lean()
            if (deviceFound.length == 0) return Promise.reject({status: 400, message: 'No Device Found'})
            else {
                for (let i = 0; i < deviceFound.length; i++) {
                    if (isAll || command.includes(deviceFound[i].name.toLowerCase())) {
                        initSet.device_id = deviceFound[i].device_id
                        initSet.topic = deviceFound[i].topic
                        // Update state of device and include device data into result
                        returnData.push(await new Device().changeDetail(initSet))
                    }
                }
            }
        }
        // Check for deviceType = fan
        else if (command.includes('fan') || command.includes('fans')) {
            // Check state
            var updateLevel = 'none'
            if (command.includes('on')) initSet.state = true
            else if (command.includes('off')) initSet.state = false
            else if (command.includes('increase') || command.includes('up') || command.includes('higher')) {
                initSet.state = true
                updateLevel = 'up'
            }
            else if (command.includes('decrease') || command.includes('down') || command.includes('lower')) {
                initSet.state = true
                updateLevel = 'down'
            }
            else return Promise.reject({status: 400, message: 'Invalid Action'})
            // Find any device included in command
            var isAll = false
            var fanLevel = findLevel(command)
            if (command.includes('all')) isAll = true
            let query = {}
            query.type = 'fan'
            var deviceFound = await device.find(query).lean()
            if (deviceFound.length == 0) return Promise.reject({status: 400, message: 'No Device Found'})
            else {
                for (let i = 0; i < deviceFound.length; i++) {
                    if (isAll || command.includes(deviceFound[i].name.toLowerCase())) {
                        initSet.device_id = deviceFound[i].device_id
                        initSet.topic = deviceFound[i].topic
                        if (updateLevel != 'none') {
                            if (fanLevel == -1) return Promise.reject({status: 400, message: 'Invalid Increase/Decrease Level'})
                            else if (updateLevel == 'up') initSet.level = Math.min(3, deviceFound[i].level + fanLevel)
                            else initSet.level = Math.max(1, deviceFound[i].level - fanLevel)
                        }
                        else initSet.level = fanLevel
                        // Update state of device and include device data into result
                        returnData.push(await new Device().changeDetail(initSet))
                    }
                }
            }
        }
        else return Promise.reject({status: 400, message: 'Command Unrecognizable'})
    }
    catch (err) {
        return Promise.reject({status: 400, message: 'Bad Request'})
    }
    
    return returnData
}

function findLevel(command = '') {
    if (command.includes('one') || command.includes(' 1')) return 1
    if (command.includes('two') || command.includes(' 2')) return 2
    if (command.includes('three') || command.includes(' 3')) return 3
    return -1
}

export default voiceAnalyze