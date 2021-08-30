import server from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import ConsoleDAO from './api/dao/console.DAO.js'
import GameDAO from './api/dao/game.DAO.js'
dotenv.config()

const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 8000

MongoClient.connect(process.env.MONGO_URI, {
  poolSize: 50,
  waitQueueTimeoutMS: 2500,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((error) => {
    console.error(error.stack)
    process.exit(1)
  })
  .then(async (client) => {
    await ConsoleDAO.injectDB(client)
    await GameDAO.injectDB(client)
    server.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })
