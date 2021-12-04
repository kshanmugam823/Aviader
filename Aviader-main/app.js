import express from "express";
import fetch from "node-fetch";

var app = express();

app.set('port', 57239);                 // Set a port number at the top so it's easy to change in the future

const APPID = "7078299be27ee986f92f04a37191b0f3";

async function getWeatherData(zip) {
    const response = await fetch(
        "http://api.openweathermap.org/data/2.5/weather?zip="
        + zip + ",us&appid=" + APPID + "&units=metric", {
            headers: {'Content-Type': 'application/json'}
        }
    );
    return await response.json()
};

/* GET home page. */
app.get('/', function(req, res, next) {
    if ("zip" in req.query) {    
        const zip = req.query["zip"];
        getWeatherData(zip).then(weatherData => {
            console.log(weatherData);
            res.send(weatherData);
        });
    }
});

app.use(function(req,res){
  res.status(404);
  //res.send('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  //res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://flip1.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
  });

