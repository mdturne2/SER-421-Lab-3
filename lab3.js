var express = require('express');
var url = require('url');
var app = express();
var pug = require('pug')
var bodyParser = require('body-parser');

//setup templates path and view engine as pug
app.set("views","./views");
app.set("view engine","pug");
app.engine("pug",pug.__express);

//used to get info from login page
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//specified in part 1
var BooksJSON = '{ \
   "books":[  \
      {  \
         "id":"book1",\
         "name":"Book Title",\
         "price":"9.99",\
         "url":"http://something.org/book"\
      },\
      {  \
         "id":"book2",\
         "name":"Book Title 2",\
         "price":"1.99",\
         "url":"http://something.org/book2"\
      }\
   ]\
}';

//turn books json string into a json object
var booksObject = JSON.parse(BooksJSON);

//set the books in the libarary 
app.locals.books = booksObject.books;

app.listen(8080);

//Most likely gotta remove this bit before submission, just wanted to see how this works out
//##;D
app.get('/', function (req, res) {
 /* var response = '<html><head><title>Simple Send</title></head>' +
                 '<body><h1>Hello from Express! You gotta go to <a href="/landing">/landing</a> to start up this bad boy ;D</h1></body></html>';
    
  res.status(200);
  res.set({
    'Content-Type': 'text/html',
    'Content-Length': response.length
  });
  res.send(response);
  */
    res.render("landingTest")
  console.log('Response Finished? ' + res.finished);
  console.log('\nHeaders Sent: ');
  console.log(res.headersSent);
});

//generate the landing page
//we could probably put the response string into a file and just load it up, but
//im not sure how good that would be 
app.get('/landing', function (req, res) {
    
  res.render("landing");
  console.log('Response Finished? ' + res.finished);
  console.log('\nHeaders Sent: ');
  console.log(res.headersSent);
});

app.get('//login.html', function (req, res) {
    
  res.render("login");
  console.log('Response Finished? ' + res.finished);
  console.log('\nHeaders Sent: ');
  console.log(res.headersSent);
});

app.post('//login', function (req, res) {
    
  if(req.body.name != '' &&req.body.name == req.body.pwd)
    {
      res.render('loginSuccess');
    }
  else
    {
      app.locals.loginFail = true;
      res.render('login');
    }
  app.locals.loginFail = false;
  console.log('Response Finished? ' + res.finished);
  console.log('\nHeaders Sent: ');
  console.log(res.headersSent);
});

//definitely gotta remove this bit later ##;D
app.get('/error', function (req, res) {
  res.status(400);
  res.send("This is a bad request.");
});