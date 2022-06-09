const SQL = require('sql-template-strings')
const DatabaseConnector = require('./DatabaseConnector')

  const CreateDataPointGoogleSpreadSheet = async ({ 
	  	org_id,
		title,
		description,
		sheet_id,
		spreadsheet_id,
		cell,
		service_account
	}) => {
	const db = await DatabaseConnector()
	const data_point_google_spread_sheet = await db.query(SQL`INSERT INTO data_points_google_sheets (org_id, title, description, sheet_id, spreadsheet_id, cell, service_account) VALUES (${org_id}, ${title}, ${description}, ${sheet_id}, ${spreadsheet_id}, ${cell}, ${service_account})`)
	await db.end()
	return data_point_google_spread_sheet
  }
	
	
module.exports = CreateDataPointGoogleSpreadSheet;