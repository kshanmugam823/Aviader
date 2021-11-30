var button = document.querySelector('#getWeather');
var input = document.querySelector('#zip');
var temp = document.querySelector('#mainTemp');
var humidity = document.querySelector('#weatherHumidity');
var description = document.querySelector('#weatherDescript');

var mapDisplay = document.querySelector('embedMap')

var birdOne = document.getElementById('cardinal');
var birdTwo = document.getElementById('robin');
var birdThree = document.getElementById('jay');


button.addEventListener('click', function(){

	// Fetch request to weather service
	fetch('http://flip1.engr.oregonstate.edu:57239/?zip='+ input.value)
		.then(response => response.json())
		.then(data => {
			var tempValue = data['main']['temp'];
			var humValue = data['main']['humidity'];
			var descriptValue = data['weather'][0]['description'];

			temp.innerHTML = tempValue;
			humidity.innerHTML = humValue;
			description.innerHTML	= descriptValue;
			input.value = "";
		})
	
	// Fetch request for IoT MQTT broker service
	fetch('https://bko7deq544.execute-api.us-east-2.amazonaws.com/dev/scitizen', {
		method: 'GET',
		mode: 'cors',
		headers: {
			'authorization-token': '39dfjlekjaoviIEJ33To',
		},
		}
		).then(response => response.json()).then(data => console.log(data))
	
	// Fetch request for map service
	fetch('https://mapservice-stumpfjo.uw.r.appspot.com/map', {
		method: 'POST'
		})
		.then(response => response.json())
		.then(data => {
			var mapInfo = data
			mapDisplay.innerHTML = mapInfo;
		})
	
	// Fetch request for common birds
	fetch('http://flip3.engr.oregonstate.edu:64234/scraper', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		mode: "no-cors",
		body: JSON.stringify({
			PageURL1: 'https://www.linvilla.com/wp-content/uploads/2019/01/The-Northern-Cardinal-Bird.jpg'
		})
		}).then(response => response.json())
		.then(data => {
			birdOne.innerHTML = '<img src=' + PageURL1 + 'alt="" />';
		});
	
	fetch('http://flip3.engr.oregonstate.edu:64234/scraper', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		mode: "no-cors",
		body: JSON.stringify({
			PageURL2: 'https://www.nps.gov/miss/learn/nature/images/GordonDietzman-20160716-8568.jpg'
		})
		}).then(response => response.json())
		.then(data => {
			birdTwo.innerHTML = '<img src=' + PageURL2 + 'alt="" />';
		});

	fetch('http://flip3.engr.oregonstate.edu:64234/scraper', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		mode: "no-cors",
		body: JSON.stringify({
			PageURL3: 'https://www.allaboutbirds.org/guide/assets/photo/311635911-720px.jpg'
		})
		}).then(response => response.json())
		.then(data => {
			birdTwo.innerHTML = '<img src=' + PageURL3 + 'alt="" />';
		});
	

})
