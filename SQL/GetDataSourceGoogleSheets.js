const SQL = require('sql-template-strings')
const DatabaseConnector = require('./DatabaseConnector')

  const GetDataSourceGoogleSheets = async (org_id) => {
	const db = await DatabaseConnector()
	const data_sources_google_sheets = await db.query(SQL`SELECT * FROM data_sources_google_sheets WHERE org_id=${org_id}`)
	await db.end();
	return data_sources_google_sheets;
  }
	
module.exports = GetDataSourceGoogleSheets;