// Command structure:
//  - "Turn on"/"Turn off" + <name of device> + <level (optional)> 
// or "Open"/"Close" + "door"
// Command can be in any order
// FE use voice recognizer to parse voice command as a string in req.body, then analyze it in BE
// Hint for FE: use Expo Dev Client and EAS CLI to install @react-native-voice lib for speech-to-text

// API: /v1/voicecmd
// req.body: 
// 	{
// 		"command": <a string converted into lowercase>
// 	}

import VoiceControl from "../service/index.js"

const voiceAnalyze = async (req, res, next) => {
	try {
		const data = await new VoiceControl().voiceAnalyze(req.body)
        res.status(200).json({data})
		console.log("Voice command successful")
	} catch (err) {
		next(err)
	}
}

export default voiceAnalyze