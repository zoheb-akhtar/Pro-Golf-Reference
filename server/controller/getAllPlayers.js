const pool = require("../db.js")

const getAllPlayers = async (req, res) => {
    try {
      const { league, nation, name, playerAmount = 25, pageNumber = 1 } = req.query
  
      let whereClause = "WHERE 1=1"
      let values = []
  
      if (league) {
        whereClause += ` AND league = $${values.length + 1}`
        values.push(league)
      }
      if (nation) {
        whereClause += ` AND nation = $${values.length + 1}`
        values.push(nation)
      }
      if (name) {
        whereClause += ` AND name ILIKE $${values.length + 1}`
        values.push(`%${name}%`)
      }
  
      const limit = parseInt(playerAmount)
      const offset = (parseInt(pageNumber) - 1) * limit
  
 
      const queryWithPagination = `
        SELECT * FROM player
        ${whereClause}
        ORDER BY world_ranking
        LIMIT $${values.length + 1} OFFSET $${values.length + 2}
      `;
      const paginatedValues = [...values, limit, offset]
      const players = await pool.query(queryWithPagination, paginatedValues)
  
      if (players.rows.length === 0) {
        return res.status(404).json({ error: "No players were found" })
      }
  
      res.status(200).json({
        players: players.rows,
      });
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  module.exports = getAllPlayers