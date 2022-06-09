const SQL = require('sql-template-strings')
const DatabaseConnector = require('./DatabaseConnector')

  const GetDashboards = async (org_id) => {
	const db = await DatabaseConnector()
	const dashboards = await db.query(SQL`SELECT * FROM dashboards WHERE org_id=${org_id}`)
	await db.end()
	return dashboards
  }
	
	
module.exports = GetDashboards;