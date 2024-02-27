/*
	-> We have taken the variables which store sensitive information and put them into an environment 
      variables (.env) file 
	-> This is the line we are using to import them back into this main JavaScript file, with the `config` 
      function in the `dotenv` module

	For environment variables:
		-> Environment variables are variables whose values are sensitive or private (e.g API keys), but which 
        are used in the main JavaScript file 
		-> Since they are sensitive, they are stored locally on the client's machine and imported into the main 
        JavaScript file using this line 
		-> The value of those variables is stored in the .env environment file (if there is one, for example, the 
        information about which MongoDB database to connect the application to, the port number to connect to)

	Importing the module for the environment variables:
		-> Those are variables process.env.name_of_variable <- this is the which imports them in 
			-> They are the `environment variables` in this project
			-> We are importing those variables into the project 
		-> `require` <- how you import modules into a JavaScript file
		-> `dotenv` <- the name of the module you import 
			-> This is the module for importing environment variables in Node.js applications 
		-> `config` <- this is a function in the module we're importing  
*/

require('dotenv').config();

/*
	Setting the const's for the project server.js file <- 1/7
	-> We are importing the express module 
	-> We are creating an Express application with Node.js dependencies 
	-> require <- the JavaScript method used to import modules 
		-> We are importing the Express module 
		-> This stores its functions in the express variable 
	-> We can use this to create instances of the Express application 
		-> This is the application we will use to create middleware with etc
*/

const express = require('express');

/*
	Setting the const's for the project server.js file <- 2/7
	-> Similar to the last import, the `require` method is used to import modules into JavaScript
	-> We are importing the `body-parser` module 
	-> This is middleware for parsing HTTP requests
	-> This is what allows the server to take request (`req`) objects from the client <- it takes the data from 
    those request bodies and makes them available under req.body 
	-> This is for Express applications -> with data that would normally be sent as a JSON (JavaScript) object 
*/

const bodyParser = require('body-parser');

/*
	Setting the const's for the project server.js file <- 3/7
	-> Importing the cors module 
	-> This module contains middleware functions which we use to make communication between the client and the server 
    secure 
	-> Webpages can only make requests to domains other than the one served from the original webpage 
	-> This is the module we use to place restrictions over which domains that requests can be made to 
	-> We are trying to avoid requests being made to insecure domains 
*/

const cors = require('cors');

/*
	Setting the const's for the project server.js file <- 4/7
	-> Importing the dns module (dns is a Node.js module)
	-> This stands for Domain Name System (lookup)
	-> We run these lookups to validate URLs and allow connectivity 
*/

const dns = require('dns');

/*
	Setting the const's for the project server.js file <- 5/7
	-> This line imports the url module for Node.js 
	-> This allows us to parse URLs <- since this entire application is a URL shortener microservice
*/

const urlParse = require('url');

/*
	Setting the const's for the project server.js file <- 6/7
	-> The entire Express module was the first constant which we imported into this JavaScript file 
	-> This line creates an instance of an Express application called `app`
	-> This is done with the express() function 
*/

const app = express();

/*
	Setting the const's for the project server.js file <- 7/7
	-> We are storing the value of the port which we want the application to listen to 
	-> process.env <- this is telling the file to look into the environment variables file, because the port number 
    can be considered sensitive information 
	-> PORT is the name of the variable in that file 
	-> The pipe symbol || is telling the server to otherwise set the value of the port variable equal to 8080
	-> If there is no environment variable file to look into for the value of this variable, then use this number 
    for it instead 
	-> We are telling the Express application which port to listen to 
		-> The application will otherwise use the environment variables as its default values 
		-> We are telling the application which port to use, and providing it with options so it can do so more flexibilly  
*/

const port = process.env.PORT || 8080;

/*
	Uses of the app.use method in the project:
		-> `app` is the variable which stores the instance of the Express application for this project
		-> We are adding middleware into this application in each of these use cases -> the middleware is just different 
			-> We are using CORS middleware for secure communications 
			-> We are ensuring that the server can handle request objects which are in JSON syntax (JavaScript objects)
			-> We are making sure that we serve static files in the server public directory 
		-> These middleware functions are executed sequentially on each request the client makes 

		Cors:
			-> The first use of the .use method is for CORS middleware functions
			-> This imports the cors middleware into the Express `app` application 
			-> This allows the server to handle cross-origin requests <- we are limiting the number of domains which requests 
          can be made to
			-> cors was the name of the variable which stored this middleware -> we are telling the code that we want to use 
          the functions stored in the cors module for the `app` application 

		Body parser:
			-> The app.use JavaScript code tells the application, "we are going to use this middleware" <- everything inside 
          the argument of that function is telling it which middleware to use 
				-> In this use case it's the body parser middleware 
			-> This middleware parses URL-encoded data from incoming HTTP requests 
				-> We are going to use this middleware to create the URL shortener 
			-> The argument of this middleware
				-> extended:false 
				-> This configures the microservice to process URLs in a specific (non-encoded) syntax 
				-> `app` is an Express application, so we can access this using req.body <- the body of the object which the client 
            is requesting 

		JSON middleware:
			-> When the client makes HTTP requests in JSON format, the request objects are in that form -> which the server must 
          parse 
			-> The third use of the .use method here is for parsing request objects which are in JSON syntax (JavaScript objects)
			-> This is another instance of body parser middleware (as was the previous one)
			-> The server can then take payloads in JSON syntax and parse them 
			-> They are then stored in `req.body` 

		Static file serving:
			-> The final use of the .use method in this block is for static file serving middleware functions 
			-> The first argument in this use case sets the directory on the server where these static files are
			-> The second argument tells the application which middleware to use on the files in that directory -> the express.static 
          middleware 
				-> It maps the file paths on the server into URLs 
				-> We are defining the naming convention for this 
*/

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(`${process.cwd()}/public`));

/*
	There are two uses of the .get method in this block: 
	
		To serve an HTML file:
			-> The first use of the .get method in this block is to send (serve) the project index.html file from the server to the 
        client 
			-> `app` is the variable which stores the instance of the Express application for the project
			-> The client makes a GET request to the server at the path '/' (the root path) <- we are route handling this request 
			-> This triggers a callback function, which is the second argument of the get method here 
			-> The function which is executed is sendFile <- we are sending back the HTML file to the client 
				-> We are also telling the client where that HTML file is located on the server (this is its argument)
				-> process.cwd <- this is the current working directory in the Node.js process which we use to do this
			-> This serves the main HTML file when the users access the root path  

		Setting up URL mapping:
			-> This block defines two standalone variables, `urlMappings` and `urlCounter`
			-> For the first variable, we are using the Map() function 
				-> This is so that we can store the URLs entered into the microservice 
				-> There can be multiple of these URLs, and we are in effect counting them / giving them indices 
				-> These keys allow us to link longer URLs to their shortened versions 
			-> The second variable initialises the counter of the keys 
				-> The URLs which are entered into the microservice will start from 1 

		GET requests to the short URL directory:
			-> If the client makes a GET request to the path which is included as an argument of this request, then it runs the 
          callback function which is its second argument 
				-> The URL to this path has :id <- this is a parameter in the URL
				-> The value of this is set as the first variable (constant) in the function -> by running the .params method on 
            the requested object 
				-> The second variable we set stores the non-shortened URL <- it gets this from using the urlMappings map  

			-> The if block in this callback function:
				-> Entry result is the variable which stores the non-shortened URL 
				-> This is a JavaScript if-block: 
					-> If the non-shortened 'URL' the user enters is a URL, then the server will redirect to its original URL 
					-> If the non-shortened 'URL' isn't a URL (else), then the server will respond with a JSON (JavaScript) object 
					-> The response (res) object stores a message, which is sent from the server back to the client 
					-> This JSON object contains this error message, indicating that the entered 'URL' isn't a URL

		-> This allows us to truncate the URLs by using mappings: 
			-> These allow us to link each shortened URL with its longer version 
			-> We start these mappings from 1 - so that when a user accesses a short URL, the microservice will redirect them back 
          to its longer counterpart if it exists in the memory map 
*/

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const urlMappings = new Map();
let urlCounter = 1;

app.get('/api/shorturl/:id', function (req, res) {
  const { id } = req.params;

  const entryResult = urlMappings.get(Number(id));

  if (entryResult) {
    res.redirect(entryResult);
  } else {
    res.json({ error: 'invalid id' });
  }
});





















app.post('/api/shorturl', function (req, res) {
  const { url } = req.body;

  // Check if url is valid
  dns.lookup(urlParse.parse(url).hostname, (err, ip) => {
    if (!ip) {
      console.log('error');
      res.json({ error: 'invalid url' });
    } else {
      // If the entry is not yet in database
      if (!urlMappings.has(url)) {
        // Set the new shortUrl for the given url
        const shortUrl = urlCounter;
        urlMappings.set(shortUrl, url);
        urlCounter++;
      }

      const entryResult = Array.from(urlMappings.entries()).find(([, value]) => value === url);

      res.json({ original_url: entryResult[1], short_url: entryResult[0] });
    }
  });
});
















app.listen(port, function () {
  console.log(`Listening on port ${port}.`);
});
