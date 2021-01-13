var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');

var api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
  cloud: './cloud/main.js', // Path to your Cloud Code
  appId: 'myAppId',
  masterKey: 'myMasterKey', // Keep this key secret!
  fileKey: 'optionalFileKey',
  serverURL: 'http://localhost:1337/parse' // Don't forget to change to https if needed
});

var options = { allowInsecureHTTP: false };

var dashboard = new ParseDashboard({
  apps: [
    {
      serverURL: "http://localhost:1337/parse",
      appId: "myAppId",
      masterKey: "myMasterKey",
      appName: "MyApp"
    }
  ]
}, options);

var app = express();

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

var httpServer = require('http').createServer(app);
httpServer.listen(1337);

