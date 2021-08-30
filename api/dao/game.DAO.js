import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectID

let games

export default class GameDAO {
  static async injectDB(client) {
    if (games) {
      return
    }
    try {
      games = await client.db('Game').collection('game')
    } catch (error) {
      consoles.error(`unable to establish a collection: ${error}`)
    }
  }

  static async postGame(name, genre, consoleID) {
    genre = Array.isArray(genre) ? genre : [genre]
    try {
      const gameDoc = {
        name,
        genre: genre,
        consoleID: consoleID ? ObjectId(consoleID) : 'undefined',
      }
      return await games.insertOne(gameDoc)
    } catch (error) {
      console.error(`Unable to post game: ${error}`)
      throw error
    }
  }

  static async getGames(
    { filters = null, page = 0, limit = 20 } = {},
    showConsole
  ) {
    //check and populate query fom filters
    let query = {}
    if (filters) {
      query = { $match: {} }
      if ('name' in filters) {
        query.$match.name = { $regex: filters.name, $options: '$i' }
      }
      if ('genre' in filters) {
        query.$match.genre = { $regex: filters.genre, $options: '$i' }
      }
    }

    const lookUp = {
      $lookup: {
        from: 'console',
        localField: 'consoleID',
        foreignField: '_id',
        as: 'console',
      },
    }

    if (showConsole == 'true') query = query.$match ? [query, lookUp] : [lookUp]

    //find
    let pointer
    try {
      pointer = await games.aggregate(query)
    } catch (error) {
      console.error(error)
      throw `Unable to issue find command: ${error}`
    }

    const displayPointer = pointer.limit(limit).skip(limit * page)
    try {
      const gamesList = await displayPointer.toArray()
      const totalNumGames = gamesList.length
      return { gamesList, totalNumGames, filters }
    } catch (error) {
      console.error(error)
      throw `Unable to convert pointer to array or problem counting documents: ${error}`
    }
  }
}
