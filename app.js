const express = require('express')
const bodyParser = require('body-parser');
const helmet = require('helmet')

const usersRouter = require('./routes/users-v1')
const usersModel = require('./model/users')

const app = express()
const port = process.env.PORT || '3000'

app.use(bodyParser.json())
app.use(helmet())

// On injecte le model dans le router. Ceci permet de supprimer la dépendance
// directe entre le router et le modele
app.use('/v1/users', usersRouter(usersModel))

/**
 * Listen on provided port, on all network interfaces.
 */
//for unit test
exports.app = app