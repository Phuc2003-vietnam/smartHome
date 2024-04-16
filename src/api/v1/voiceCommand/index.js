import {Router} from 'express'
import voiceAnalyze from './controllers/voiceAnalyze.js'

const voicecmd_router = Router()

voicecmd_router.put('/',voiceAnalyze)

export default voicecmd_router