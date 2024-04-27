import {getDatabase, ref, set, get, child} from 'firebase/database'
import {Expo} from 'expo-server-sdk'

async function sendSample({userId}) {
	const db = getDatabase()
	const dbRef = ref(db)
	const expo = new Expo()
	const {token} =(await get(child(dbRef,`userTokens/${userId}/`))).val()??{}
	expo.sendPushNotificationsAsync([
		{
			to: token,
			title: 'soil level low',
			body: 'water please',
		},
	])
}

export default sendSample
