require('dotenv').config()
const express = require('express');

const { GoogleSpreadsheet } = require('google-spreadsheet');
// const cert = require('./cert.json'); // the file saved above
const {promisify} = require("es6-promisify");




const Cert = process.env.REACT_APP_CERT;
const ParsedCert = JSON.parse(Cert);



 const GoogleSpreadsheetIntegration = async ({serviceAccount, cell, spreadsheetId, sheetId }) => {
	const doc = new GoogleSpreadsheet(`${spreadsheetId}`);

	await doc.useServiceAccountAuth({
	  client_email: ParsedCert.client_email,
	  private_key: ParsedCert.private_key,
	});



	await doc.loadInfo(); // loads document properties and worksheets
	console.log(doc);
	const sheet = doc.sheetsById[`${sheetId}`]; // or use doc.sheetsById[id]
	// console.log(sheet.title);
	// console.log(sheet.rowCount);
	await sheet.loadCells()
	const c6 = sheet.getCellByA1(`${cell}`); // or A1 style notation
	console.log(c6.value);
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