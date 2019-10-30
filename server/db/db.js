const chalk = require('chalk');
const Sequelize = require('sequelize');
const pkg = require('../../package.json');

console.log(chalk.yellow('Opening database connection'));

// create the database instance that can be used in other database files
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${pkg.name}`,
  {
    logging: false // so we don't see all the SQL query made
  }
);

module.exports = db;

//set up associations in index.js inside models not here then export models from index.js
