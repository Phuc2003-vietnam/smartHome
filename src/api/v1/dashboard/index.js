import {Router} from 'express'
import addFakeData from './controllers/addFakeData.js'
import getDashBoard from './controllers/getDashBoard.js'

const dashboard_router = Router()
// dashboard_router.get('/values', getValue)
dashboard_router.get('/', getDashBoard)
dashboard_router.post('/fake-data', addFakeData)

export default dashboard_router
