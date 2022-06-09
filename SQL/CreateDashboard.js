const SQL = require('sql-template-strings')
const DatabaseConnector = require('./DatabaseConnector')

  const CreateDashboard = async ({ org_id, title, description }) => {
	const created_at = Date.now();
	const db = await DatabaseConnector()
	const dashboards = await db.query(SQL`INSERT INTO dashboards (org_id, title, description) VALUES (${org_id}, ${title}, ${description})`)
	await db.end()
	return dashboards
  }
	
	
module.exports = CreateDashboard;