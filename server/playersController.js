const pool = require("./db.js")

const getAllPlayers = async (req, res) => {
    try {
      const { league, nation, name, playerAmount = 25, pageNumber = 1 } = req.query;
  
      let whereClause = "WHERE 1=1";
      let values = [];
  
      if (league) {
        whereClause += ` AND league = $${values.length + 1}`;
        values.push(league);
      }
      if (nation) {
        whereClause += ` AND nation = $${values.length + 1}`;
        values.push(nation);
      }
      if (name) {
        whereClause += ` AND name ILIKE $${values.length + 1}`;
        values.push(`%${name}%`);
      }
  
      const limit = parseInt(playerAmount);
      const offset = (parseInt(pageNumber) - 1) * limit;
  
 
      const queryWithPagination = `
        SELECT * FROM player
        ${whereClause}
        ORDER BY world_ranking
        LIMIT $${values.length + 1} OFFSET $${values.length + 2}
      `;
      const paginatedValues = [...values, limit, offset];
      const players = await pool.query(queryWithPagination, paginatedValues);
  

      const countQuery = `SELECT COUNT(id) FROM player ${whereClause}`;
      const countResult = await pool.query(countQuery, values);
  
      if (players.rows.length === 0) {
        return res.status(404).json({ error: "No players were found" });
      }
  
      res.status(200).json({
        players: players.rows,
        count: parseInt(countResult.rows[0].count)
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

const getPlayerById = async (req, res) => {
    try {
        const { id } = req.params
        const player = await pool.query("SELECT * FROM player WHERE id = $1", [id])

        if (player.rows.length === 0){
            return res.status(404).json({error: "This player does not exist"})
        }
        res.status(200).json(player.rows[0])

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getPlayersByStat = async (req, res) => {
    try {
        const {direction, stat, name} = req.query
        const validStats = ["world_ranking", "scoring_avg", "sg_total", "sg_total", "sg_putting", "gir", "fairways", "scrambling", "birdie_avg"]
        const validDirections = ["asc", "desc"]

        if (!validStats.includes(stat)) {
        return res.status(400).json({ error: "Invalid stat field" })
        }
        if (!validDirections.includes(direction?.toLowerCase())) {
        return res.status(400).json({ error: "Invalid direction" })
        }
        let query = `SELECT * FROM player`
        let values = []
        if (name){
            query += ` WHERE name ILIKE $1`
            values.push(`%${name}%`)
        }
        const players = await pool.query(`${query} ORDER BY ${stat} ${direction.toUpperCase()}`, values)
        if (players.rows.length === 0) {
            return res.status(404).json({error: "This player does not exist"})
        }
        res.status(200).json(players.rows)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    getAllPlayers,
    getPlayerById,
    getPlayersByStat
}


