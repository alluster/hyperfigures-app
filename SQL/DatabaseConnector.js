require('dotenv').config()
const mysql = require('promise-mysql')

  const DatabaseConnector = async () => {
	return await mysql.createConnection({
		host:  process.env.REACT_APP_DATABASE_HOST,
		user:  process.env.REACT_APP_DATABASE_USERNAME,
		password:  process.env.REACT_APP_DATABASE_PASSWORD,
		database: process.env.REACT_APP_DATABASE
	})
  }

module.exports = DatabaseConnector;