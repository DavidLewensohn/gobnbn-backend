const MongoClient = require('mongodb').MongoClient

const config = require('../config')
const { dbURL } = require('../config/prod')

module.exports = {
    getCollection
}

// Database Name
const dbName = 'my_airbnb_db'

var dbConn = null

async function getCollection(collectionName) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        console.log(err)
        // logger.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('dbURL:',config.dbURL)///
        const db = client.db(dbName)
        dbConn = db
        return db
    } catch (err) {
        console.log(err)
        // logger.error('Cannot Connect to DB', err)
        throw err
    }
}






