document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
	document.getElementById('getWeather').addEventListener('click', function(event){
		var req = new XMLHttpRequest();
		var appID = "&appid=7078299be27ee986f92f04a37191b0f3";          //My API key when I signed up for an account
		var zip = document.getElementById("zip").value;
        var city = document.getElementById("city").value;
        var payload;

        if(zip == 5)    //Use zip code if available
		{
            payload = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us" + appID + '&units=imperial';      //Add imperial to query to get imperial units (from documentation)
        }
        else
        {
            payload = "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",us" + appID + '&units=imperial';
        }
		req.open("GET", payload, true);                             //Set third parameter to true to send asynchronous request

		req.addEventListener('load', function() {                   //Want the function to execute once everything loads
			if (req.status >= 200 && req.status < 400) {
				var response = JSON.parse(req.responseText);
				displayWeather(response);                       //Call the function to display the information
			} else {
				console.log("error");
			}
    });
		req.send();
		event.preventDefault();
});
}

function displayWeather(response)
{
    document.getElementById("mainTemp").textContent = response.main.temp;               //display the weather data
    document.getElementById("weatherHumidity").textContent = response.main.humidity;
    document.getElementById("weatherSpeed").textContent = response.wind.speed;
    document.getElementById("sunriseStart").textContent = response.sys.sunrise;
}
