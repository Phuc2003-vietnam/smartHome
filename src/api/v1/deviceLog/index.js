import {Router} from 'express'
import getLogs from './controllers/getLogs.js'

const logs_router = Router()

logs_router.get('/',getLogs)

export default logs_router