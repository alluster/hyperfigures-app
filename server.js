require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const path = require('path');
const schema = require('./Schemas');
var cors = require('cors');
const { createHandler } = require('graphql-http');

app.use(cors())
app.use ('/graphql', createHandler({
	schema
}))

  
app.post('/api', async (req, res) => {
	const response = await accessSpreadsheet(req.params.cell);
	console.log("response:", response)
})	


app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => console.log("Server is running..."));

	
