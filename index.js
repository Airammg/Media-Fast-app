
require('dotenv').config()

const express = require('express')
const api = express()
const morgan = require('morgan')
const env = process.env

const { checkConnection, syncModels } = require('./db/index.db.js')
const addRelationsToModels = require('./db/relation.db.js')


const express = require("express");
const api = express();
const morgan = require("morgan");
const env = process.env;
const { checkConnection, syncModels } = require("./db/index.db.js");
const addRelationsToModels = require("./db/relation.db.js");

function initializeAndListenWithExpress() {

	const api = express()
		.use(morgan('dev'))
		.use(express.json())
		.use('/api', require('./api/routes/index.routes'))


    .listen(env.PORT, () => {
      console.log(`> Listening on port: ${env.PORT}`);
    });
}

async function startAPI() {

	await checkConnection()
	await addRelationsToModels()
	await syncModels('alter')
	await initializeAndListenWithExpress()
	console.log('Todo ok')

}

startAPI();
