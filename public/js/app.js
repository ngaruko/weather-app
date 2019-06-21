console.log('Starting JavaScript client side~!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const location = search.value;

	fetch(`/weather?address=' ${location}`).then((response) => {
		
		response.json().then((data) => {
			if (data.error) {
				//document.getElementById('location').innerHTML = data.error;
				console.log(data.error);
				document.getElementById('results').innerHTML = data.error;
			} else {
				document.getElementById('location').innerHTML = `Weather for ${data.location}`;
				document.getElementById('forecast').innerHTML = data.forecast;
			}

		});
	});
	document.querySelector('form').reset();
});



