const { MongoClient } = require('mongodb');
const settings = require('../utils/settings');

const client = new MongoClient(settings.dbUrl);

async function connect() {
  const conn = await client.connect();
  const db = conn.db(settings.dbName);
  return db;
}

module.exports = { client, connect };
