require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const sslRedirect = require('heroku-ssl-redirect');
const bodyParser = require('body-parser')
const path = require('path')


app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}));


app.get('/api', (req, res) => {
	console.log("Hello world");

})


app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(process.env.PORT || 5000,
	() => console.log("Server is running..."));