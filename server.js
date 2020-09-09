// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
//api endpoint for accepting date inputs in timestamp and string formats 
app.get("/api/timestamp/:dateString",(req,res)=>{
  let dateInput=req.params.dateString;
  console.log(dateInput);
  try { //checking if input is a time stamp or a date format(eg. 27-12-10) 
      dateInput = parseInt(dateInput , 10);
  } catch (error) {
      console.log(error);
  } finally{
    try {//cheking if the date is valid timeStamp integer or a date string 
      var date = new Date(dateInput);
    } catch (error) {
      res.json({"error" : "Invalid Date" }  );
    }
      res.json({"unix": date.getTime(), "utc" : date.toUTCString() });
    }
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  console.log('http://localhost:' + listener.address().port);
});