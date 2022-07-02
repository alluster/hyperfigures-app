const SQL = require('sql-template-strings')
const DatabaseConnector = require('./DatabaseConnector')

  const GetGoogleSheets = async (org_id) => {
	const db = await DatabaseConnector()
	const googleSheets = await db.query(SQL`SELECT * FROM google_sheets WHERE org_id=${org_id}`)
	await db.end()
	return googleSheets
  }
	
	
module.exports = GetGoogleSheets;