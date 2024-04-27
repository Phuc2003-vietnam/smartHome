import {getDatabase, ref, set, get, child} from 'firebase/database'

async function registerPushToken({userId, token}) {
	const db = getDatabase()
	const dbRef = ref(db)
    const value=(await get(child(dbRef,`userTokens/${userId}/`))).val()??{}
    const payload ={...value,token}
    set(ref(db,`userTokens/${userId}/`),payload)
	res.status(200).send('Register token successfully')
}

export default registerPushToken
