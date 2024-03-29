import express from 'express'
import configExpressApp from './src/config/express.js'
// import database from './src/config/mysql.js'

const app = express()
configExpressApp(app)
