var express = require('express');
var url = require('url');
var app = express();

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

app.listen(8080);

//Most likely gotta remove this bit before submission, just wanted to see how this works out
//##;D
app.get('/', function (req, res) {
  var response = '<html><head><title>Simple Send</title></head>' +
                 '<body><h1>Hello from Express! You gotta go to <a href="/landing">/landing</a> to start up this bad boy ;D</h1></body></html>';
  res.status(200);
  res.set({
    'Content-Type': 'text/html',
    'Content-Length': response.length
  });
  res.send(response);
  console.log('Response Finished? ' + res.finished);
  console.log('\nHeaders Sent: ');
  console.log(res.headersSent);
});

//generate the landing page
//we could probably put the response string into a file and just load it up, but
//im not sure how good that would be 
app.get('/landing', function (req, res) {
  var response = '<HTML><HEAD><TITLE>Books</TITLE></HEAD><BODY><H2>All the books in the bookstore!</H2>\
<br/><TABLE cellpadding="10">\
<TH>Name</TH><TH>Price</TH><TH>More Info</TH></TR>\
<TR><TD>The Image-Guided Surgical Toolkit</TD><TD>$0.99</TD><TD><a href="http://www.igstk.org/IGSTK/help/documentation.html">Get Info</a></TR>\
<TR><TD>Abraham Lincoln</TD><TD>$19.95</TD><TD><a href="http://www.learnlibrary.com/abraham-lincoln/lincoln.htm">Get Info</a></TR>\
<TR><TD>Adventures of Tom Sawyer</TD><TD>$10.50</TD><TD><a href="http://www.pagebypagebooks.com/Mark_Twain/Tom_Sawyer/">Get Info</a></TR>\
<TR><TD>Catcher in the Rye</TD><TD>$22.95</TD><TD><a href="https://www.goodreads.com/book/show/5107.The_Catcher_in_the_Rye">Get Info</a></TR>\
<TR><TD>The Legend of Sleepy Hollow</TD><TD>$15.99</TD><TD><a href="http://www.learnlibrary.com/sleepy-hollow/sleepy-hollow.htm">Get Info</a></TR>\
<TR><TD>Moby Dick</TD><TD>$24.45</TD><TD><a href="https://www.amazon.com/Moby-Dick-Herman-Melville/dp/1503280780">Get Info</a></TR>\
<TR><TD>Java Programming 101</TD><TD>$12.95</TD><TD><a href="https://www.javaworld.com/blog/java-101/">Get Info</a></TR>\
<TR><TD>Robinson Crusoe</TD><TD>$11.99</TD><TD><a href="http://www.learnlibrary.com/rob-crusoe/">Get Info</a></TR>\
<TR><TD>The Odyssey</TD><TD>$32.00</TD><TD><a href="http://classics.mit.edu/Homer/odyssey.html">Get Info</a></TR>\
</TABLE></BODY>I want to <a href="/">purchase something</a>!</HTML>\
';
  res.status(200);
  res.set({
    'Content-Type': 'text/html',
    'Content-Length': response.length
  });
  res.send(response);
  console.log('Response Finished? ' + res.finished);
  console.log('\nHeaders Sent: ');
  console.log(res.headersSent);
});

//definitely gotta remove this bit later ##;D
app.get('/error', function (req, res) {
  res.status(400);
  res.send("This is a bad request.");
});