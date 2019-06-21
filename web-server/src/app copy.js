const path = require('path');
const express = require('express');
const chalk = require('chalk');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));



const app = express();
const pathToPublic = path.join(__dirname, '../public');

//change views path for HBS to another folder named 'templates' 
// then we do 
const viewsPath = path.join(__dirname, '../templates');

app.set('view engine', 'hbs');

//set views path
//app.set('views', viewsPath);

app.use(express.static(pathToPublic));



// app.get('', (req, resp) => {
// 	resp.send('<h1>Request success!</h1>');
// });
	
// app.get('/help', (req, resp) => {
// 	resp.send('Help Page success!');
// });

// app.get('/about', (req, resp) => {
// 	resp.send('About Page Success!');
// });


//use hbs
app.get('', (req, resp) => {
	resp.render('index');
});

app.get('/about', (req, resp) => {
	const date = new Date();
	resp.render('about', {
		aboutTitle : 'About Page',
	aboutText:`We are all for Node Js in ${date.getFullYear()}`
	});
});


app.get('/weather', (req, resp) => {
	resp.send({
		location: 'Auckland',
		weather: 'raining hard'});
});

app.listen(3000, () => {
	console.log(chalk.green('Server is up and running on port 3000!'));

});