var express = require('express');
var url = require('url');
var app = express();
var pug = require('pug');
var bodyParser = require('body-parser');
var session = require('express-session');

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

      console.log(booksObject.books.length);


//session stuff 
app.use(session({
	secret: 'SpecialKey',
	resave: true,
	saveUninitialized: true
}));

app.listen(8080);

//Most likely gotta remove this bit before submission, just wanted to see how this works out
//##;D
app.get('/', function (req, res) {
 
  res.redirect('/landing')
  console.log('Response Finished? ' + res.finished);
  console.log('\nHeaders Sent: ');
  console.log(res.headersSent);
});

//generate the landing page
//we could probably put the response string into a file and just load it up, but
//im not sure how good that would be 
app.get('/landing', function (req, res) {
  req.session.destroy(); //ends session whenever user comes here 
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
      req.session.restricted = true; //create session
      req.session.userName = req.body.name;
      app.locals.userName = req.body.name;
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

app.get('//list',function (req, res) {
    if(req.session.restricted)
    {
      //res.set('Cache-Control', 'no-cache, max-age=0 private, no-store, must-revalidate'); //does not allow back button
      app.locals.userName = req.session.userName;
      res.render("list");
    }
    else
        res.redirect('/landing');
  console.log('Response Finished? ' + res.finished);
  console.log('\nHeaders Sent: ');
  console.log(res.headersSent);
});

app.get('/list',function (req, res) {
    if(req.session.restricted)
    {
      //res.set('Cache-Control', 'no-cache, max-age=0 private, no-store, must-revalidate'); //does not allow back button
      app.locals.userName = req.session.userName;
      res.render("list");
    }
    else
        res.redirect('/landing');
  console.log('Response Finished? ' + res.finished);
  console.log('\nHeaders Sent: ');
  console.log(res.headersSent);
});

app.post('/purchase',function (req, res) {
    if(req.session.restricted)
    {
      //res.set('Cache-Control', 'no-cache, max-age=0 private, no-store, must-revalidate'); //does not allow back button
        
      var quantity = req.body.Quantity;
      app.locals.invalidQuantity = false;

      if(quantity == '')
    {
        app.locals.invalidQuantity = true;
         res.render('list');
    }
      else{
      
      app.locals.singleSelection = false;
      var purchaseTotal = 0;
      var recievedBooks = req.body.Books;
        req.session.boughtBooks = [];
      
      if(typeof recievedBooks === 'string'){
          app.locals.singleSelection = true;
          var currentBook = getBook(recievedBooks,booksObject.books);
          req.session.quantity = quantity;
          req.session.boughtBooks = currentBook;
          req.session.boughtBooks.total = currentBook.price * quantity;
          purchaseTotal+= currentBook.price * quantity;
    }
      else{
      for(var id in recievedBooks){
          var currentBook = getBook(recievedBooks[id],booksObject.books);
          req.session.quantity = quantity;
          req.session.boughtBooks.push(currentBook);
          req.session.boughtBooks[id].total = currentBook.price * quantity;
          purchaseTotal+= currentBook.price * quantity;
          }
      }
      req.session.purchaseTotal = purchaseTotal
      app.locals.purchaseTotal = req.session.purchaseTotal;
      app.locals.boughtBooks = req.session.boughtBooks;
      app.locals.quantity = req.session.quantity;
      
      
      app.locals.userName = req.session.userName;
      res.render("validate");
    }}
    else
        res.redirect('/landing');
  console.log('Response Finished? ' + res.finished);
  console.log('\nHeaders Sent: ');
  console.log(res.headersSent);
});

app.get('/purchase',function (req, res) {
    res.redirect('/landing')
  console.log('Response Finished? ' + res.finished);
  console.log('\nHeaders Sent: ');
  console.log(res.headersSent);
});

app.post('/confirm',function (req, res) {
  if(req.session.restricted)
    {
      req.session.CreditCard = req.body.Creditcard;
      req.session.cardNumber = req.body.CardNumber;    
      req.session.expressDelivery = req.body.expressdelivery;    
      app.locals.userName = req.session.userName;
      app.locals.CreditCard = req.session.CreditCard;
      app.locals.cardNumber = req.session.cardNumber;
      app.locals.expressDelivery = req.session.expressDelivery;
      
      res.render("confirmation");
    }
    else
        res.redirect('/landing');
    
  console.log('Response Finished? ' + res.finished);
  console.log('\nHeaders Sent: ');
  console.log(res.headersSent);
});

app.get('/confirm',function (req, res) {

  res.redirect('/landing');  
  console.log('Response Finished? ' + res.finished);
  console.log('\nHeaders Sent: ');
  console.log(res.headersSent);
});

//definitely gotta remove this bit later ##;D
app.get('/error', function (req, res) {
  res.status(400);
  res.send("This is a bad request. Very bad. How unfortunate :(");
});



function getBook(key, data) {
    var i;
    var length = data.length;
    
    for (i = 0; i < length; i++) {
        if (data[i].id == key) {
            return data[i];
        }
    }
    
    return -1;
}