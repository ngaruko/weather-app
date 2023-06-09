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

// TESTING CODE TO DELETE LATER
// Example POST method implementation:
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
	    authorization: 'testing-scanning-for-hard-coded-credentials'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData("https://example.com/answer", { answer: 42 }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});


