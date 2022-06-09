const SQL = require('sql-template-strings')
const DatabaseConnector = require('./DatabaseConnector')

  const GetDashboard = async ({ org_id, id }) => {
	const db = await DatabaseConnector()
	const dashboard = await db.query(SQL`SELECT * FROM dashboards WHERE org_id=${org_id} AND id=${id}`)
	await db.end()
	return dashboard
  }
	
	
module.exports = GetDashboard;