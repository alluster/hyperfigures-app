require('dotenv').config()
const express = require('express');

const { GoogleSpreadsheet } = require('google-spreadsheet');
const cert = require('./cert.json'); // the file saved above
const {promisify} = require("es6-promisify");






// cell 
// spreadsheet
// sheet by id

// get list of all spreadsheet on a service account
// get list of sheets in a spreadsheet


 const GoogleSpreadsheetIntegration = async ({cell, spreadsheetId, sheetId }) => {
	const doc = new GoogleSpreadsheet(`${spreadsheetId}`);

	await doc.useServiceAccountAuth({
	  client_email: cert.client_email,
	  private_key: cert.private_key,
	});
  

	// get all cells by range
	// get one cell





	await doc.loadInfo(); // loads document properties and worksheets
	console.log(doc);
	const sheetd = '816070597'
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