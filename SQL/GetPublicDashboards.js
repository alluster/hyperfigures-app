const SQL = require('sql-template-strings');
const DatabaseConnector = require('./DatabaseConnector');

const GetPublicDashboards = async ({
	org_id,
	dashboard_id
}) => {
	const db = await DatabaseConnector();
	const dashboards = await db.query(SQL`SELECT * FROM dashboards_public WHERE org_id=${org_id} AND dashboard_id=${dashboard_id}`);
	await db.end();
	return dashboards;
};
	
	
module.exports = GetPublicDashboards;