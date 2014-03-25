# salmonJS

[![Build Status](https://travis-ci.org/fabiocicerchia/salmonjs.png)](https://travis-ci.org/fabiocicerchia/salmonjs)
[![Dependency Status](https://gemnasium.com/fabiocicerchia/salmonjs.png)](https://gemnasium.com/fabiocicerchia/salmonjs)
[![Code Climate](https://codeclimate.com/github/fabiocicerchia/salmonjs.png)](https://codeclimate.com/github/fabiocicerchia/salmonjs)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/fabiocicerchia/salmonjs/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

[![NPM](https://nodei.co/npm/salmonjs.png?downloads=true&stars=true)](https://nodei.co/npm/salmonjs/)

[![salmonJS - Web Crawler in Node.js to spider dynamically whole websites.](http://jpillora.com/github-twitter-button/img/tweet.png)](https://twitter.com/intent/tweet?text=salmonJS+-+Web+Crawler+in+Node.js+to+spider+dynamically+whole+websites.&url=https%3A%2F%2Ffabiocicerchia.github.io%2Fsalmonjs&hashtags=salmonjs&original_referer=http%3A%2F%2Fgithub.com%2F&tw_p=tweetbutton)

Web Crawler in Node.js to spider dynamically whole websites.

**IMPORTANT: This is a DEVELOPMENT tool, therefore SHOULD NOT be used against a
website you DO NOT OWN!**

It helps you to map / process entire websites, spidering them and parsing each
page in a smart way. It follows all the links and test several times the form
objects. In this way is possible to check effectively the whole website.

## What's this for?

This project was born with the aim of improve the legacy code, but it's not
strictly restricted only to that.

salmonJS will crawl every page from an entry-point URL, retrieving all the links
in the page and firing all the events bound to any DOM element in the page in
order to process all the possible combination automatically.
The only "limitation" of an automatic robot is the user input, so for that cases
has been implemented the test case files where it's possible to define custom
input values (e.g.: POST variables for forms, input values for javascript
prompts, etc).

With this in mind the usage of salmonJS could be different based on your own
needs, like checking legacy code for dead code or profiling the web app
performance.

Here below few suggestions about its usage:

 * Improve the legacy code
  * Check the dead code (enabling the code coverage server-side)
  * Discover 500 Internal Server Errors
  * Discover notices and warnings
  * SQL profiling
 * Testing
  * Process forms (it'll create easy test cases to be manually compiled)
  * Process automatically JS events attached to DOM nodes
 * Scraping
  * Get the page content for each URL
  * Get the screenshot for each URL
 * Enumeration
  * URLs list
  * Execution times
  * Page output
  * Page load
 * ...

## Features

 * Command Line Interface
 * Catch and handle all the events bound to DOM elements (regardless how they have been set)
 * Follows any 3xx redirect, JS document.location and meta redirect (can be disabled)
 * Ignore duplicated URLs / requests and external URLs
 * Test case files, with support of:
  * COOKIEs
  * FILES upload
  * GET parameters
  * HTTP headers
  * POST parameters
 * HTTP authentication
 * Proxy settings
 * Politeness Policy
 * Generate report for each page crawled, with: 6
  * Screenshot
  * HTTP headers
  * HTTP method
  * Data sent (GET and POST)
  * Page output
  * Execution time
  * Console messages
  * Alerts, Confirmations & Prompts
  * Errors
  * List of successful and failed requests
 * Pool system to limit the number of workers in the same time, then queue them
 * Multiple crawlers working asynchronously one URL each one
 * Support for the following HTML tags:
   a, area, base, form, frame, iframe, img, input, link, script
 * URL normalisation
 * Process the web page using PhantomJS
 * Process all the output content types
 * Keep the connection alive for lower CPU and memory load on the server

## Dependencies

Here the list of main dependencies:

 * [Node.js](http://nodejs.org/download/)
    * Tested with v0.8.26, v0.10.25 and v0.11.11
 * [PhantomJS](http://phantomjs.org/download.html)
    * Tested with v1.9.7
 * [CasperJS](http://casperjs.org/) (optional, only for tests)
    * Tested with v1.1.0-beta3
 * [Redis](http://redis.io/download)
    * Tested with v2.9.6

## Installation

You can install it directly from npm:

```
[user@hostname ~]$ npm install salmonjs -g
```

or you can download the source code from GitHub and run these commands:

```
[user@hostname ~/salmonjs]$ npm install
```

## Configuration

Change the file `src/config.js` accordingly to your needs.

### Test Cases

Here an example of a test case file:

```
; Test Case File
; generated by salmonJS v0.4.0 (http://fabiocicerchia.github.io/salmonjs) at Sat, 01 Jan 1970 00:00:00 GMT
; url = http://www.example.com
; id = http___www_example_com

[GET]
variable1=value1

[POST]
variable1=value1
variable2=value2
variable3=@/path/to/file.ext ; use @ in front to use the upload feature (the file MUST exists)

[COOKIE]
name=value

[HTTP_HEADERS]
header=value

[CONFIRM]
Message=true ; true = OK, false = Cancel

[PROMPT]
Question="Answer"
```

## Usage

```
              __                         _____ _______
.-----.---.-.|  |.--------.-----.-----._|     |     __|
|__ --|  _  ||  ||        |  _  |     |       |__     |
|_____|___._||__||__|__|__|_____|__|__|_______|_______|

salmonJS v0.4.0
Copyright (C) 2014 Fabio Cicerchia <info@fabiocicerchia.it>

Web Crawler in Node.js to spider dynamically whole websites.
Usage: node ./bin/salmonjs

Options:
  --uri              The URI to be crawled                                                       [required]
  -c, --credentials  Username and password for HTTP authentication (format "username:password")
  -d, --details      Store details for each page (in the specified folder)
  -f, --follow       Follows redirects                                                           [default: false]
  -p, --proxy        Proxy settings (format: "ip:port" or "username:password@ip:port")
  -w, --workers      Maximum number of asynchronous workers                                      [default: 10]
  -r, --restore      Restore the previous interrupted session                                    [default: false]
  -s, --sanitise     Sanitise any malformed HTML page                                            [default: false]
  --cases            Test cases folder
  --redis            Redis configuration (format "ip:port")                                      [default: "127.0.0.1:16379"]
  --timeout          Resource timeout                                                            [default: 5000]
  --attempts         Number of attempts before stop to request the URL                           [default: 5]
  --interval         Number of millisecond before try to fetch an URL after a failure            [default: 5000]
  --disable-stats    Disable anonymous report usage stats                                        [default: false]
  -q, --quiet        Disable all the output messages
  -v                 Verbose
  --version          Display the current version
  --help             Show the help
```

## Examples

```
[user@hostname ~]$ salmonjs --uri "http://www.google.com"
[user@hostname ~]$ salmonjs --uri "www.google.com"
[user@hostname ~]$ salmonjs --uri "/tmp/file.html"
[user@hostname ~]$ salmonjs --uri "file.html"
```

## Tests

```
[user@hostname ~/salmonjs]$ npm test
```

## How it works

 * Start processing an URL
 * Open a system process to PhantomJS
  * Open the URL
  * If there is a JS event, put it into a dedicate stack
  * Inject custom event listener
    * Override existent event listener
  * Collect all the relevant info from the page for the report
  * On load complete, execute the events in the stack
  * Start to process the web page
  * Get all the links from the page content
  * Normalise and filter by uniqueness all the URLs collected
  * Get all the JS events bound to DOM elements
  * Clone the web page for each new combination in the page (confirm)
  * Put the web page instance in a dedicate stack for each JS event
  * Process the all the web pages in the stack
  * Get all the links from the page content
  * Reiterate until there are no more JS events
 * If there is an error retry up to 5 times
 * Collect all the data sent by the parser
 * Create test cases for POST data with normalised fields
 * Get POST test cases for current URL
 * Launch a new crawler for each test case
 * Store details in report file
 * Increase the counter for possible crawlers to be launched based on the links
 * Check the links if are already been processed
  * If not, launch a new process for each link
 * If there are no more links to be processed, check if there are still sub-crawlers running
  * If not so, terminate the process

## Bugs

For a list of bugs please go to the [GitHub Issue Page](https://github.com/fabiocicerchia/salmonjs/issues?labels=Bug&page=1&state=open).

## Licence

Copyright (C) 2014 Fabio Cicerchia <info@fabiocicerchia.it>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
