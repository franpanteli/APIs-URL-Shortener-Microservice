require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dns = require('dns');
const urlParse = require('url');
const app = express();

// Basic Configuration
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
