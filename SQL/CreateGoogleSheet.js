const SQL = require('sql-template-strings')
const DatabaseConnector = require('./DatabaseConnector')

  const CreateGoogleSheet = async ({ org_id, title, description, spreadsheet_id, sheet_id}) => {
	const db = await DatabaseConnector()
	const sheet = await db.query(SQL`INSERT INTO google_sheets (org_id, title, description, spreadsheet_id, sheet_id) VALUES (${org_id}, ${title}, ${description}, ${spreadsheet_id}, ${sheet_id})`)
	await db.end()
	return sheet
  }
	
	
module.exports = CreateGoogleSheet;