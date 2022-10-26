const SQL = require('sql-template-strings')
const DatabaseConnector = require('./DatabaseConnector')

  const CreatePublicDashboard = async ({ org_id, title, description, dashboard_data, dashboard_id }) => {
	const created_at = Date.now();
	const db = await DatabaseConnector()
	const dashboards = await db.query(SQL`INSERT INTO dashboards_public (org_id, title, description, dashboard_data, dashboard_id) VALUES (${org_id}, ${title}, ${description}, ${dashboard_data}, ${dashboard_id})`)
	await db.end()
	return dashboards
  }
	
	
module.exports = CreatePublicDashboard;