# APIs-URL-Shortener-Microservice-Project

This repository contains my independent problem-solving work, used to produce a full-stack JavaScript application with Node.js and Express.js. This is a URL shortener microservice, which allows users to generate shortened versions of longer URLs. This was my [third project](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice) as part of freeCodeCamp's Back End Development and APIs curriculum. *The problem-solving approach I used to create this is detailed in depth in its [server.js file](https://github.com/franpanteli/APIs-URL-Shortener-Microservice-Project/blob/main/server.js).* Building on the [first](https://github.com/franpanteli/APIs-Timestamp-Microservice-Project) and [second](https://github.com/franpanteli/APIs-Request-Header-Parser-Microservice-Project) problems I solved as part of [this course](https://www.freecodecamp.org/learn/back-end-development-and-apis/#mongodb-and-mongoose), this microservice also uses a similar architecture. This edition of the microservice parses and validates URLs, by using the `dns` and `url` modules to ensure that URLs sent to the server have the correct syntax and are hosted. This uses the `Map()` function, to implement mappings between long URLs and their shortened counterparts. Unique keys are generated for each valid URL which is submitted. When one such URL is submitted to the microservice, the server either returns the existing shortened URL or generates a new mapping in its memory.

## Microservice Installation & Usage

[My full notes on how to run the application locally are here](https://github.com/franpanteli/APIs-URL-Shortener-Microservice-Project/blob/main/launching-the-app-locally.txt). First, clone this repository with `git clone https://github.com/franpanteli/APIs-URL-Shortener-Microservice-Project.git`.



## API Endpoints

The main API endpoint for this project is `/api/shorturl`. When a client makes an HTTP POST request to this with a valid URL in its request body, the server responds with a JSON object containing the original URL and its shortened equivalent. If the client sends the server a previously shortened URL, then its existing mapping is used on behalf of the server.

## Dependencies

This project has two dependencies. The first is [express](https://www.npmjs.com/package/express), which was used to build the web application in its [server.js file](https://github.com/franpanteli/APIs-Request-Header-Parser-Microservice-Project/blob/main/server.js). The second dependency is [cors](https://www.npmjs.com/package/cors), which was used to produce Cross-Origin Resource Sharing middleware.
