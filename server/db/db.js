const Sequelize = require('sequelize');
const pg = require('../../package.json');

const dbName = pg.name;

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/boilermaker`,
  {
    logging: false,
  }
);

module.exports = db;
