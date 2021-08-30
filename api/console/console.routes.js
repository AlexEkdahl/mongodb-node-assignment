import express from 'express'
import ConsoleCtrl from './console.controller.js'
const router = express.Router()

router
  .route('/console')
  .get(ConsoleCtrl.apiGetConsoles)
  .post(ConsoleCtrl.apiPostConsole)

export default router
