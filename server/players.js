const express = require("express")
const router = express.Router()
const getAllPlayers = require("./controller/getAllPlayers")
const getPlayerById = require("./controller/getPlayerById")
const getPlayersByStat = require("./controller/getPlayersByStat")

// GET all players
router.get("/", getAllPlayers)

// GET a player by ID
router.get("/id/:id", getPlayerById)

// Get players by stats
router.get("/stat", getPlayersByStat)

module.exports = router