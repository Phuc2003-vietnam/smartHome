import DeviceLogs from "#~/model/log.js";

async function getLogs(
    limit = 20,
    offset = 0
) {
    try {
        // await DeviceLogs.deleteMany({})
        const logs = await DeviceLogs.find({}).skip(offset).limit(limit).sort({createdAt: -1}).lean()
        return logs
    }
    catch (err)
    {
        return Promise.reject({status: 401, message: err})
    }
}

export default getLogs