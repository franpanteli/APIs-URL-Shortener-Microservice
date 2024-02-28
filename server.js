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

/*
    This code handles HTTP POST requests:
        -> `app` <- this is the name of the variable which stores the instance of the Express application 
        -> .post <- this method is used to handle HTTP POST requests made to Express applications, et al

    Arguments:
        -> The first argument in this is the path on the server to which the request is made, by the client 
            -> This is an 'endpoint' 
        -> The second argument of this route handler is its callback function: 
            -> This is the function which the server runs to produce its response object
            -> This is defined in the block of code inside the callback function 
            -> The arguments of this function are the `res` (response) and `req` (request) objects 

    The callback function:
        -> This is the function which is the second argument in the block of code
            -> This is defined in its main body 

    Extracting the URL from the request object:
        -> The client sends a request object (`req`) to the server
        -> The previously defined middleware ensures that if this is in the incorrect syntax, an error message will be displayed
        -> When the client makes a request to the server, they are sending a request object to them, which is a JSON object that 
            should contain a URL 
        -> The first constant that we are defining in this callback function extracts the URL which the client entered into this 
            request object
        -> We are doing this on the server side, once that object has reached the server
        -> req.body is the content of that file, and `url` is a property which we are assuming it has   
        -> This technique is called destructuring <- extracting the URL from the request object, which is in the form of a JSON 
            object 

      Is the URL valid, or is it not?
        The if block in the callback function: 
            -> The server has extracted the URL that the client entered 
            -> We have taken the request object and extracted the URL from that (JSON, JavaScript) object 
            -> That is stored in a variable - from the previous constant    
            -> This if block checks that this URL is valid 
            -> The previous middleware functions were checking that it was in the syntax of a URL -> and entering an error message 
                if it wasn't    
            -> We know that what the user has entered in this case follows the syntax of a URL (because it reached this block of 
                code)
            -> But we don't know that the URL they have entered is real (valid, live, hosted) 
            -> We are looking it up using a method in the DNS module called .lookup 
            -> The argument this function takes:
                -> The first argument this function takes is the hostname of that URL 
                -> This is the hostname of the URL which we previously extracted (that the client entered in the request object)
                -> The second argument that the block of code takes is a callback function 
                -> The callback function is what the code does, depending on the outcome of the executed method
                -> The JavaScript if block which is embedded into this use of the .lookup method is an if block 

        If the user has entered a valid URL:
            -> Invalid is a word for, 'not being hosted' 
            -> If what the user entered wasn't a URL at all, then the middleware from above would have given them an error message 
            -> If we have gotten to this stage of the code without an error message, it means that they have entered something in the 
                correct syntax of a URL 
            -> We check here that this URL is 'valid' (hosted) 
            -> The first section of the if block says, 'if it's not hosted because there is no valid ip, then do this'
            -> In this case, we log an error message to the console (to the terminal where the server is listening to the port)
            -> The server responds to the client who inputted the unhosted URL by sending them a response object 
            -> That response object is a JSON (JavaScript) object - with this error message 

        If the URL the user enters is valid: 
            'Valid' means that the URL is actually hosted, not that what was entered does not take the syntax of a URL:
                -> By 'valid', meaning 'hosted' 
                -> The point that, in both cases where the URL is valid or is not valid, the 'URL' still takes the syntax of a URL -> 
                    just in one case it's hosted and in the other it's not 
                -> By validation, we are talking about taking something which takes the syntax of a URL - and is actually hosted 
                
            This is the code that will be executed if the entered URL is in the correct syntax, and is valid (hosted):
                -> If the entered code was actually in the syntax of a URL, then it would have reached this entire block of code <- otherwise, 
                    it would have been taken out by the middleware above
                -> If the entered URL was hosted, then it will have reached the else block under the JavaScript for its DNS lookup 
                -> In this case, the client has sent the server a 'URL' which takes the syntax of a URL, and which is hosted 
                -> The question is, what does the server do if the client enters a 'URL' which is in the syntax of a URL, and which is valid 
                    / hosted?
                -> The project is for a URL shortener microservice, and this block of code is for that case
                -> If we give the server a valid URL, either it's seen it before - or it hasn't 
                -> What it does, is it takes those longer URLs and maps them onto shorter URLs using keys which are stored in its mapping
                -> So either it's seen this valid URL before, or it hasn't
                -> If it's seen the valid URL before, we want to return back its key in the server's map 
                -> If it hasn't seen the URL before, we want to add it to the microservice mappings and generate a key for it
 
                Adding the valid URL to the microservice mappings:
                    This is the case where: 
                        a) The client has entered a 'URL', in the syntax of a URL
                        b) That URL is hosted (it's valid) and
                        c) The microservice hasn't seen it before

                    -> In which case, we want to add the URL to the server's mapping 
                    -> This refers to the `if (!urlMappings.has(url))` if block 
                    -> We are saying, if `urlMappings` (the database of mappings which the server has) doesn't have (`!`) this URL which the 
                        client has entered, then execute this block of code
                        -> This is an example use of in-memory storage
                    -> The three lines in this block:
                        -> Set this URL equal to the URL counter for the keys in the map 
                        -> Link that URL with a key 
                        -> Increase the value of the counter which produced the key by a value of 1 (`urlCounter++`)

                Looking up the URL in the microservice mapping:
                    This is the case where:
                        a) The user enters a 'URL', which takes the syntax of a URL
                        b) That URL is hosted (it's valid) and 
                        c) The microservice has seen it before 
                            -> This means there exists an entry in the microservice mapping which represents the URL  

                    -> The client has sent the URL to the server
                    -> The server has a series of mappings
                    -> We are converting this mapping into an array using the Array. method, on the server-side 
                    -> This is a 1xn array, and each of its elements are mappings for a unique URL
                    -> Each such mapping is a 1x2 vector, which [0] stores the index of that element in the mapping and [1] stores its URL 
                    -> We know that the client has entered a URL and that this is in the server's array of all potential mappings
                    -> This block of code looks up this mapping and returns back its index as a JSON (JavaScript) object 

                    The first line: 
                        -> Takes the map and converts it into an array
                        -> Each element in that array is a 1x2 vector 
                        -> It finds the 1x2 vector in that array which matches the URL that the client entered 
                        -> We store this 1x2 object in the `entryResult` variable 
                        -> The first element in that variable is the index of the URL, and the second element is the URL 
                        -> The purpose of this is to extract the index of the element in the database which represents the URL the client 
                            entered
                            -> We are doing this since we know that in this case, that URL exists in the server's mapping 

                    The second line:
                        -> The server now has a 1x2 object, which 
                            a) Contains the key (index) of the URL which the client entered, and
                            b) Contains the URL itself which they entered 
                        -> The client sent the server a URL, now the server wants to send back a JSON (JavaScript) object with the index 
                            of that URL in its mapping - and the URL itself  
                        -> This line of code takes the 1x2 variable `entryResult` which stores this key (`[0]`) and URL (`[1]`) and packages 
                            it into a JSON (JavaScript) response (`res`) object, to send back to the client 

                        -> We are saying:
                            -> If what the client enters takes the syntax of a URL
                            -> And if that URL is hosted ('valid')
                            -> And that URL exists in the server's database of all potential mappings from URLs to keys 
                            -> Then - send back the index of that URL in the server's mapping which represents it 
                            -> Return this back to the client as a JSON (JavaScript) object, containing the URL and its index (key) in the 
                                server's mapping

    In this block of code, we define a route handler for HTTP POST requests <- this instructs the application what to do if the text in request 
    bodies received by the application follow URL syntax:

        Case #1 <- the URL the client entered isn't hosted:
            -> We check that the URL the client entered is actually valid (hosted)
            -> We do this by executing a lookup, using the `dns` module 
            -> We then return an error message and execute a console log, saying that the URL the client entered isn't valid   

        Case #2 <- the URL the client entered is valid (hosted), but the server hasn't seen it before: 
            -> We add the URL to the server's mapping - since the server hasn't seen it before, and it is a valid URL
            -> We do this by using a counter on the server side, whose value increases by 1 each time the application receives a response object 
                matching this case #2 criteria 

        Case #3 <- the URL the client entered is valid (hosted), and it exists in the server's URL-key map:
            -> We instruct the server to return the URL back to the client, along with the index of its shortened version on the server's map   
            -> We generate this server-side response in the form of a JSON (JavaScript) object 
*/

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

/*
	Telling the application to listen to a port:
		-> `app` is the name of the variable which stores this instance of the Express application
		-> This project is intended to be run locally
		-> This block of code uses the .listen method
		-> This tells the server which port to listen to 

		The arguments of this are:
			The port number that the application will use: 
				-> The value of this is stored in the `port` variable
				-> The value of this was set at the beginning of this server.js file
				-> Since this port number is sensitive information, this file imports its value from an external .env (environment) file 
				-> If this file is non-existent, then we use pipe symbols (`||`) to set its value to 8080  

			The callback function which we want to execute when the server starts listening to the port: 
				-> We use the .log method here, to write a message in the terminal
				-> This uses the `$` symbol, so that the user (running the project locally) knows which port the server is listening to 
					-> This is called a template literal 
					-> The server is listening to this port, for connections made to it by the client 

	There are two stages when the client connects to the server: 
		-> The client makes requests to the port, by accessing its associated URL  
		-> The server can access that same port, by 'listening' to it 
		-> When the client makes a request to the port via accessing its URL, a request object is sent to the server
		-> The server then implements route handling and sends back an appropriate response object to the client, via the port 

		For this exchange to happen:
			-> The server must listen to the port <- this is what this section of code does, and we will know that the server is listening 
				to the port once the console logs the message which is set here 
			-> The client must access the port via a URL 
			-> That URL is specific to the port 	
			-> The client must make a request -> in this case, by accessing the microservice at that URL 
			-> The server must have the correct middleware, depending on the contents of the request object 

	-> We are telling the server to listen for connections made to that port 
	-> The code earlier which set the port number also dictates which URL the client accesses the microservice from 
*/

app.listen(port, function () {
  console.log(`Listening on port ${port}.`);
});