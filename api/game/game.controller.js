import GameDAO from '../dao/game.DAO.js'

export default class GameController {
  static async apiPostGame(req, res, next) {
    const { name, genre, consoleID } = req.body

    try {
      const postResponse = await GameDAO.postGame(name, genre, consoleID)
      res.status(201).json({
        status: 'success',
        game_created: postResponse.ops[0],
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async apiGetGames(req, res, next) {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 20

    const page = req.query.page ? parseInt(req.query.page, 10) : 0
    let filters = {}

    if (req.query.name) {
      filters.name = req.query.name
    }
    if (req.query.genre) {
      filters.genre = req.query.genre
    }

    try {
      const postResponse = await GameDAO.getGames({
        filters,
        page,
        limit: limit,
      })
      res.status(200).json(postResponse)
    } catch (error) {
      res.status(400).json(error)
    }
  }
}
