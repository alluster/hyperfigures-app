const SQL = require('sql-template-strings')
const DatabaseConnector = require('./DatabaseConnector')

  const GetPublicDashboard = async ({ id }) => {
	const db = await DatabaseConnector()
	const dashboard = await db.query(SQL`SELECT * FROM dashboards_public WHERE id=${id}`)
	await db.end()
	return dashboard
  }
	
	
module.exports = GetPublicDashboard;