const SQL = require('sql-template-strings');
const DatabaseConnector = require('./DatabaseConnector');

const GetDataPointsGoogleSheetsDashboard = async ({
	org_id,
	dashboard_id

}) => {
	const db = await DatabaseConnector();
	const data_points_google_sheets = await db.query(SQL`SELECT * FROM data_points_google_sheets WHERE org_id=${org_id} AND deleted_at IS NULL AND dashboard_id=${dashboard_id} `);
	await db.end();
	return data_points_google_sheets;
};
	
module.exports = GetDataPointsGoogleSheetsDashboard;