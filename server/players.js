const express = require("express")
const router = express.Router()
const {
    getAllPlayers,
    getPlayerById,
    getPlayersByStat
} = require("./playersController.js")

// GET all players
router.get("/", getAllPlayers)

// GET a player by ID
router.get("/id/:id", getPlayerById)

// Get players by stats
router.get("/stat", getPlayersByStat)

module.exports = router