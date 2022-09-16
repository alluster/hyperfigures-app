const SQL = require('sql-template-strings');
const DatabaseConnector = require('./DatabaseConnector');

const CreateDataPointGoogleSpreadSheet = async ({ 
	org_id,
	title,
	description,
	sheet_id,
	spreadsheet_id,
	sheet_title,
	cell,
	service_account,
	dashboard_id
}) => {
	const db = await DatabaseConnector();
	const data_point_google_spread_sheet = await db.query(SQL`INSERT INTO data_points_google_sheets (org_id, title, description, sheet_id, spreadsheet_id, sheet_title, cell, service_account, dashboard_id) VALUES (${org_id}, ${title}, ${description}, ${sheet_id}, ${spreadsheet_id}, ${sheet_title}, ${cell}, ${service_account}, ${dashboard_id})`);
	await db.end();
	return data_point_google_spread_sheet;
};
	
	
module.exports = CreateDataPointGoogleSpreadSheet;