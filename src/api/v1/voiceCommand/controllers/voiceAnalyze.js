// Valid command structure:
// - Include 1 on 3 device type ('fan', 'door', 'light")
// - 'on'/'off' or 'open'/'close' to set state
// - ['increase', 'up', 'higher']/['decrease', 'down', 'lower'] to change fan level up/down
// - Can change state of multiple devices using 'all' keyword of include device name in command
// FE use voice recognizer to parse voice command as a string in req.body, then analyze it in BE
// Hint for FE: use Expo Dev Client and EAS CLI to install @react-native-voice lib for speech-to-text

// API: /v1/voicecmd
// req.body: 
// 	{
// 		"command": <a string converted into lowercase>
// 	}

// return data: data of all modified devices as a <Device> entity

import VoiceControlService from "../service/index.js"

const voiceAnalyze = async (req, res, next) => {
	try {
		const data = await new VoiceControlService().voiceAnalyze(req.body)
        res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default voiceAnalyze