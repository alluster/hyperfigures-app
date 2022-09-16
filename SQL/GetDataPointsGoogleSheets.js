const SQL = require('sql-template-strings');
const DatabaseConnector = require('./DatabaseConnector');

const GetDataPointsGoogleSheets = async (org_id) => {
	const db = await DatabaseConnector();
	const data_points_google_sheets = await db.query(SQL`SELECT * FROM data_points_google_sheets WHERE org_id=${org_id} AND deleted_at IS NULL `);
	await db.end();
	return data_points_google_sheets;
};
	
module.exports = GetDataPointsGoogleSheets;