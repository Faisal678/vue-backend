const express = require('express')
const cors = require('cors')
const connectDb = require('./config/db')
const http = require('http')
const routes = require('./routes/index');
require('dotenv').config()

const app = express()
app.use(cors())
const port = process.env.PORT || 5000
http.createServer(app)

connectDb()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', routes);

app.listen(port, () => console.log(`Server started on port ${port}`))
