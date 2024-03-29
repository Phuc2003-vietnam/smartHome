import device from '#~/model/device.js'

async function changeDetail({device_id,type,state=-1,mode=-1,level=-1,start=-1,end=-1,close_time=-1}) {
    var query={}
	if(state!=-1){
        query.state=state
    }
    if(mode!=-1){
        query.mode=mode
    }
    if(level!=-1){
        query.level=level
    }
    if(start!=-1){
        query.start=start
    }
    if(end!=-1){
        query.end=end
    }
    if(close_time!=-1){
        query.close_time=close_time
    }
    const updatedDevice = await device.findOneAndUpdate({device_id}, query, { new: true }).lean();
    //TODO Handle time change to activate or intactivate hardwares
    return updatedDevice;
}

export default changeDetail
