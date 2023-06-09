const express = require('express');
const appRoute = require("./route/route.js")
require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 8080

app.use(express.json())

app.use("/api", appRoute)

app.listen(8080 , () => {
    console.log(`server is started server is running on port${PORT}`)
})