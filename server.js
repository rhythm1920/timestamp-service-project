var moment = require("moment");
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});
//api endpoint for accepting date inputs in timestamp and string formats
app.get("/api/timestamp/:dateString", (req, res) => {
  let dateInput = req.params.dateString;
  if (dateInput.search("-") === -1) {
    // checking if input is timestamp or date-String(Eg. 2015-12-25)
    dateInput = parseInt(dateInput); //convering timestamp  string to integer
  } else {
    if (moment(dateInput).isValid() === false) {
      //checking if date string is valid or not
      res.json({ error: "Invalid Date" });
    }
  }
  let date = new Date(dateInput);
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});
//api end-point for returning the times-stamp of current time
app.get(["/api/timestamp/", "/api/timestamp"], (req, res) => {
  let now = new Date();
  res.json({ unix: now.getTime(), utc: now.toUTCString() });
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
  console.log("http://localhost:" + listener.address().port);
});
