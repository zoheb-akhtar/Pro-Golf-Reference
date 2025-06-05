const pool = require("../db.js")

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

module.exports = getPlayerById