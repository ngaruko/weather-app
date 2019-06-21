const path = require('path');
const express = require('express');
const chalk = require('chalk');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
//for heroku
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.resolve(__dirname, '../public');
const viewsPath = path.resolve(__dirname, '../templates/views');
const partialsPath = path.resolve(__dirname, '../templates/partials');


// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


//use hbs
app.get('', (req, res) => {
	res.render('index', {
		title: 'Home Page',
		name: 'Bede Ngaruko',
		text: `Welcome to our Node application`
	});
});

app.get('/about', (req, res) => {
	const date = new Date();
	res.render('about', {
		title: 'About Page',
		name: 'Bede Ngaruko',
	text:`We are all for Node Js in ${date.getFullYear()}`
	});
});


app.get('/help', (req, res) => {
		res.render('help', {
		title: 'Help Page',
		name: 'Bede Ngaruko',
		text: `How can we help you?`
	});
});

//get weather 
app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address!'
		});
	}

	geocode(req.query.address, (error, {latitude, longitude, location }={}) => {
		if (error) {
			return res.send({ error: 'Unable to find location. Please try another search!' });
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error: 'Check your parameter' });
			}

			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			});
		});
	});
});

//Error 404 pages

app.get('/help/*', (req, res) => {
	res.render('404 Page Not Found!', {
		title: '404',
		name: 'Bede Ngaruko',
		errorMessage: 'Help Article not found!'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404 Page Not Found!',
		name: 'Bede Ngaruko',
		errorMessage: 'Page not found!'
	});
});


app.listen(port, () => {
	console.log(chalk.green(`Server is up and running on port ${port}!`));

});
