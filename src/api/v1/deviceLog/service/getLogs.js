import DeviceLogs from "#~/model/log.js";

async function getLogs({
    limit = 20,
    offset = 0
}) {
    try {
        // await DeviceLogs.deleteMany({})
        const logs = await DeviceLogs.find({}).skip(offset).sort({createdAt: -1}).limit(limit).lean()
        return logs
    }
    catch (err)
    {
        return Promise.reject({status: 401, message: err})
    }
}

export default getLogs