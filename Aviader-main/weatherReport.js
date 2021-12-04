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
			PageURL: 'https://www.lyricbirdfood.com/birding-hub/behavior/10-fascinating-facts-the-northern-cardinal/'
		})
		}).then(response => response.json())
		.then(data => {
			var birdInfo1 = data["image0"]
			birdOne.innerHTML = '<img src=' + birdInfo1 + 'alt="" />';
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
			var birdInfo2 = data["image0"]
			birdTwo.innerHTML = '<img src=' + birdInfo2 + 'alt="" />';
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
			var birdInfo3 = data["image0"]
			birdTwo.innerHTML = '<img src=' + birdInfo3 + 'alt="" />';
		});
	

})
