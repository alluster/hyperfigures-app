const SQL = require('sql-template-strings');
const DatabaseConnector = require('./DatabaseConnector');

const GetGoogleSheets = async ({ org_id, id }) => {
	const db = await DatabaseConnector();
	const googleSheet = await db.query(SQL`SELECT * FROM google_sheets WHERE org_id=${org_id} AND id=${id}`);
	await db.end();
	return googleSheet;
};
	
	
module.exports = GetGoogleSheets;