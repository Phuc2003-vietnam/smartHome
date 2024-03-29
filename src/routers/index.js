import express from 'express'
import ver1_router from '../api/v1/index.js'

const router = express.Router()



router.use('/v1', ver1_router)

export default router
