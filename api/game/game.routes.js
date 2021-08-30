import express from 'express'
import GameCtrl from './game.controller.js'
const router = express.Router()

router.route('/game').get(GameCtrl.apiGetGames).post(GameCtrl.apiPostGame)

export default router
