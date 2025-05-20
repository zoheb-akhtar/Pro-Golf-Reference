const express = require("express")
const cors = require("cors")
require('dotenv').config();
const port = process.env.PORT || 8080
const app = express()
const players = require("./players.js")

app.use(express.json())
app.use(cors())

app.use("/players", players)

app.get("/ping", (req, res) => {
    res.send("Server pinged!")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})