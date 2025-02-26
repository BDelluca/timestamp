// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:timeRequest", function (req, res) {
  let { timeRequest } = req.params;
  let timeRequestNumber = Number(timeRequest);
  let dateUnix = new Date(timeRequestNumber).toUTCString();
  let dateUtc = new Date(timeRequest + "T00:00:00").toUTCString();
  let dateUtcToUnix = Date.parse(dateUtc);

  if (dateUnix == "Invalid Date") {
    if (dateUtc == "Invalid Date") {
        res.json({
          error : "Invalid Date"
        })
    } else {
      res.json({
        unix: dateUtcToUnix, 
        utc: dateUtc
      });
    }
  } else {
    res.json({
      unix: timeRequestNumber, 
      utc: dateUnix
    });
  }

  
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
