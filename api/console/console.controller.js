import ConsoleDAO from '../dao/console.DAO.js'

export default class ConsoleController {
  static async apiPostConsole(req, res, next) {
    const { console: name, releaseDate, manufacture } = req.body

    try {
      const postResponse = await ConsoleDAO.postConsole(
        name,
        releaseDate,
        manufacture
      )
      res.status(201).json({
        status: 'success',
        console_created: postResponse.ops[0],
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async apiGetConsoles(req, res, next) {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 20

    const page = req.query.page ? parseInt(req.query.page, 10) : 0
    let filters = {}

    if (req.query.name) {
      filters.name = req.query.name
    }
    if (req.query.manufacture) {
      filters.manufacture = req.query.manufacture
    }

    try {
      const postResponse = await ConsoleDAO.getConsoles({
        filters,
        page,
        limit: limit,
      })
      res.status(200).json(postResponse)
    } catch (error) {
      res.status(400).json(error)
    }
    // const { consolesList, totalNumConsoles } = await UsersDAO.getUsers({
    //   filters,
    //   page,
    //   limit: limit,
    // })

    // let response = {
    //   consolesList,
    //   page: page,
    //   filters,
    //   entries_per_page: limit,
    //   total_results: totalNumConsoles,
    // }
  }
}
