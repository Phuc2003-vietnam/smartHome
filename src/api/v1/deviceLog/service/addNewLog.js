import DeviceLogs from "#~/model/log.js";
import Device from "#~/model/device.js";

async function addNewLog({
    device_id = -1,
    state = null,
    level = -1
}) {
    try {
        if (device_id != -1)
        {
            let query = {device_id: device_id}
            let deviceFound = await Device.find(query).lean()
            let deviceLogInfo = ''
            if (deviceFound.length > 0 && state != null) {
                deviceLogInfo = 'Device <' + deviceFound[0].name + '> is '
                if (state == true) {
                    deviceLogInfo += (deviceFound[0].type == 'door'? 'opened' : 'turned on')
                    if (level != -1) deviceLogInfo += ' at level ' + JSON.stringify(level)
                }
                else deviceLogInfo += (deviceFound[0].type == 'door'? 'closed' : 'turned off')
                DeviceLogs.create({deviceLogInfo})
            }
        }
        return
    }
    catch (err) {
        return Promise.reject({status: 401, message: err})
    }
}

export default addNewLog