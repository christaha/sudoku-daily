require('dotenv').config();

class Settings {
  constructor(dbUrl, dbName) {
    this.dbUrl = dbUrl;
    this.dbName = dbName;
  }
}

const settings = new Settings(process.env.DB_URL, process.env.DB_NAME);

module.exports = settings;
