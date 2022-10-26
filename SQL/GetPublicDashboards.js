const SQL = require('sql-template-strings');
const DatabaseConnector = require('./DatabaseConnector');

const GetPublicDashboards = async (org_id) => {
	const db = await DatabaseConnector();
	const dashboards = await db.query(SQL`SELECT * FROM public_dashboards WHERE org_id=${org_id}`);
	await db.end();
	return dashboards;
};
	
	
module.exports = GetPublicDashboards;