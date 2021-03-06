var express = require("express");	//include express modules
var bodyParser = require("body-parser"); //body-parser module is needed to parse http request's body since express.js does not have an in built support for this || bodyparser to parse json payloads on http requests
var mongoose = require("mongoose"); //document object mapper --> we will use it to interact with mongodb in our application
var path = require("path");			//include path modules

//controllers 
var derasarController = require("./controllers/derasarController");

//Express request pipeline
var app = express();				//create a express app
app.use(express.static(path.join(__dirname,"../app/dist")));  //It serves static files from app/dist
app.use(bodyParser.json());
app.use("/api", derasarController);

/* Redirect http to https */
app.get('*',function(req,res,next){
  if(req.headers['x-forwarded-proto']!='https')
    res.redirect('https://'+req.headers.host+req.url);
  else
    next(); /* Continue to other routes if we're not redirecting */
});

var port = process.env.PORT || 7777;
app.listen(port,function(){
	console.log("Started listening on port",port);
});

// Connect to mongodb database
var mongoURI = "mongodb://localhost/derasar";
mongoose.connect(process.env.MONGOLAB_URI || mongoURI);
