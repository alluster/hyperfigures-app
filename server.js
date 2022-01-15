require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const sslRedirect = require('heroku-ssl-redirect');
const bodyParser = require('body-parser')
const path = require('path')
const { GoogleSpreadsheet } = require('google-spreadsheet');
const cert = require('./cert.json'); // the file saved above
const {promisify} = require("es6-promisify");

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}));



const doc = new GoogleSpreadsheet("1bDHTVqRDH_ntYgRJCy6Q2Sn_N1OdrBnW3YZjYAxSRmk");

const accessSpreadsheet = async (cell) => {
	await doc.useServiceAccountAuth({
	  client_email: cert.client_email,
	  private_key: cert.private_key,
	});
  
	await doc.loadInfo(); // loads document properties and worksheets
	console.log(doc.title);
  
	const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
	console.log(sheet.title);
	console.log(sheet.rowCount);
	await sheet.loadCells('A1:E10')
	const c6 = sheet.getCellByA1('C10'); // or A1 style notation
	console.log(c6.value);
	return(
		c6.value
	)
}	

  
app.post('/api', async (req, res) => {
	const response = await accessSpreadsheet(req.params.cell);
	console.log("response:", response)
	res.json("hello")
})	


app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(process.env.PORT || 5000,
	() => console.log("Server is running..."));