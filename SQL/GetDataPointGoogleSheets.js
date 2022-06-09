const SQL = require('sql-template-strings')
const DatabaseConnector = require('./DatabaseConnector')

  const GetDataPointGoogleSheets = async ({
	  org_id,
	  id
  }) => {
	const db = await DatabaseConnector()
	const data_point_google_sheets = await db.query(SQL`SELECT * FROM data_points_google_sheets WHERE org_id=${org_id} AND id=${id}`)
	await db.end();
	return data_point_google_sheets;
  }
	
module.exports = GetDataPointGoogleSheets;