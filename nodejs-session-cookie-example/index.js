const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { signinHandler, welcomeHandler, refreshHandler, logoutHandler } = require('./handlers')

const app = express()
var cors = require('cors');

app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.1.146:3000'],
  credentials: true
}))
app.use(bodyParser.json())
app.use(cookieParser())

app.post('/signin', signinHandler)
app.get('/welcome', welcomeHandler)
app.post('/refresh', refreshHandler)
app.get('/logout', logoutHandler)


app.listen(8888)