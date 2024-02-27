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





const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dns = require('dns');
const urlParse = require('url');
const app = express();
const port = process.env.PORT || 8080;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(`${process.cwd()}/public`));



app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// In-memory storage for URL mappings
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
