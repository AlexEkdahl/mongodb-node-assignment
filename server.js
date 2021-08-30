import express from 'express'
import cors from 'cors'
import console from './api/console/console.routes.js'
import game from './api/game/game.routes.js'
import morgan from 'morgan'

const server = express()
server.use(cors())
server.use(express.json())
server.use(morgan('dev'))

server.use('/api/v1/', console)
server.use('/api/v1/', game)
server.use('*', (req, res, next) =>
  res.status(404).json({ error: 'page not found' })
)

export default server
