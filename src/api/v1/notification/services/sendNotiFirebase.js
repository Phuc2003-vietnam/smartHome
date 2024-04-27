import Expo from 'expo-server-sdk'

async function sendNotiFirebase({msg}) {
	const expo = new Expo()
	expo.sendPushNotificationsAsync([
		{
			to: process.env.FIREBASE_USER_TOKEN,
			title: 'Smart house warning',
			body: msg,
		},
	])
}

export default sendNotiFirebase
