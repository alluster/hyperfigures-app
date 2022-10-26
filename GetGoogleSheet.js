require('dotenv').config()
const express = require('express');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const {promisify} = require("es6-promisify");

const GoogleSpreadsheetIntegration = async ({ spreadsheetId, sheetId, org_id}) => {
	const doc = new GoogleSpreadsheet(`${spreadsheetId}`);
	const Cert = process.env['REACT_APP_CERT_' + org_id];
	const ParsedCert = JSON.parse(Cert);
	await doc.useServiceAccountAuth({
	  client_email: ParsedCert.client_email,
	  private_key: ParsedCert.private_key,
	});


	await doc.loadInfo(); // loads document properties and worksheets
	console.log(doc)
	const sheet = doc.sheetsById[`${sheetId}`]; // or use doc.sheetsById[id]
	console.log(sheet)
	await sheet.loadCells()
	const c6 = sheet.getCellByA1(`${cell}`); // or A1 style notation
	return(
		// c6.value
		[
			{
				"value": `${c6.value}`
			}
		]
	)
}	

module.exports = GoogleSpreadsheetIntegration;