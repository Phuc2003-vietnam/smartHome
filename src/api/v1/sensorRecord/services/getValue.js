import sensorRecord from '#~/model/sensorRecord.js'
function getTime(){
	const today = new Date()
	const startOfToday = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate(),
		0,
		0,
		0
	) // Start of today (midnight)
	const endOfToday = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate(),
		23,
		59,
		59
	) // End of today (11:59:59 PM)
	return {startOfToday,endOfToday}
}

async function getValue({type,isAll}) {
	let { startOfToday, endOfToday } = getTime();
    let query = { type, createdAt: { $gte: startOfToday, $lt: endOfToday } };

    if (!isAll) {
        // For the latest record, just limit the result to 1 and sort in descending order
        const latestRecord = await sensorRecord.findOne(query)
                                               .sort({ createdAt: -1 })
                                               .limit(1);
        return latestRecord;
    }

    // For all records, fetch without any limitation
    const allRecords = await sensorRecord.find(query);
    return allRecords;
}

export default getValue
