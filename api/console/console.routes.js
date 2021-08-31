import express from 'express'
import ConsoleCtrl from './console.controller.js'
const router = express.Router()

router
  .route('/console')
  .get(ConsoleCtrl.apiGetConsoles)
  .post(ConsoleCtrl.apiPostConsole)
router.route('/console/games').get(ConsoleCtrl.apiGetConsoleGames)

export default router
