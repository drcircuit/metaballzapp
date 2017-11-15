var express = require('express');
var app = express();
var path = require('path');
// Define the port to run on
app.set('port', 404);


app.use(express.static(path.join(__dirname, '/public')));
app.use('/3rdparty',express.static(path.join(__dirname, 'bower_components')));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});