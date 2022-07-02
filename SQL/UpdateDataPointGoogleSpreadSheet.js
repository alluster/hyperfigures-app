const SQL = require('sql-template-strings');
const DatabaseConnector = require('./DatabaseConnector');

const UpdateDataPointGoogleSpreadSheet = async ({ 
	id,
	deleted_at
}) => {
	console.log('id from server:', id);
	const db = await DatabaseConnector();
	const data_point_google_spread_sheet_delete = await db.query(SQL`INSERT INTO data_points_google_sheets (id) VALUES (${id}) ON DUPLICATE KEY UPDATE deleted_at = ${deleted_at} `);
	await db.end();
	console.log(data_point_google_spread_sheet_delete);
	return data_point_google_spread_sheet_delete;
};
	
module.exports = UpdateDataPointGoogleSpreadSheet;