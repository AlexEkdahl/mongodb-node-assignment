import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectID

let consoles

export default class ConsoleDAO {
  static async injectDB(client) {
    if (consoles) {
      return
    }
    try {
      consoles = await client.db('Game').collection('console')
    } catch (error) {
      consoles.error(`unable to establish a collection: ${error}`)
    }
  }

  static async postConsole(name, releaseDate, manufacture) {
    try {
      const consoleDoc = {
        name,
        releaseDate,
        manufacture,
      }
      return await consoles.insertOne(consoleDoc)
    } catch (error) {
      console.error(`Unable to post console: ${error}`)
      throw error
    }
  }

  static async getConsoles({ filters = null, page = 0, limit = 20 } = {}) {
    //check and populate filters fom query
    let query = {}
    if (filters) {
      if ('name' in filters) {
        query.name = { $regex: filters['name'], $options: '$i' }
      }
      if ('manufacture' in filters) {
        query.manufacture = { $regex: filters['manufacture'] }
      }
    }
    //find
    let pointer
    try {
      pointer = await consoles.find(query)
    } catch (error) {
      console.error(error)
      throw `Unable to issue find command: ${error}`
    }
    const displayPointer = pointer.limit(limit).skip(limit * page)
    try {
      const consolesList = await displayPointer.toArray()
      const totalNumConsoles = await consoles.countDocuments(query)
      return { consolesList, totalNumConsoles, filters }
    } catch (error) {
      console.error(error)
      throw `Unable to convert pointer to array or problem counting documents: ${error}`
    }
  }
  static async getConsoleGames({ filters = null, page = 0, limit = 20 } = {}) {
    //check and populate filters fom query
    let query = {}
    if (filters) {
      if ('name' in filters) {
        query.name = { $regex: filters['name'], $options: '$i' }
      }
      if ('manufacture' in filters) {
        query.manufacture = { $regex: filters['manufacture'] }
      }
    }
    //find
    let pointer
    try {
      pointer = await consoles.find(query)
    } catch (error) {
      console.error(error)
      throw `Unable to issue find command: ${error}`
    }
    const displayPointer = pointer.limit(limit).skip(limit * page)
    try {
      const consolesList = await displayPointer.toArray()
      const totalNumConsoles = await consoles.countDocuments(query)
      return { consolesList, totalNumConsoles, filters }
    } catch (error) {
      console.error(error)
      throw `Unable to convert pointer to array or problem counting documents: ${error}`
    }
  }
}
