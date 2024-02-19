const { MongoClient } = require("mongodb");
const settings = require("../utils/settings");

const client = new MongoClient(settings.dbUrl);

async function connect() {
    let conn = await client.connect()
    let db = conn.db(settings.dbName)
    return db
}

module.exports = { client, connect };