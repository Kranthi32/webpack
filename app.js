const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cons = require('consolidate');




app.listen(5000,function(){
    console.log('Server started on : http://localhost:5000  Port' )
});

app.get('/', function(req,res){
    //res.setHeader('Access-Control-Allow-Origin', '*')
    return res.render('Login/Login', {
        title: "Login"
    });
});

app.post('/login', (req, res) => {
    return res.render('Home/Home', {
        title: "Home"
    });
  });

  app.get('/home', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.render('Home');
});



//Define Static folder
app.use(express.static(__dirname + '/Client'));
//Define View Engine
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, '/Client/modules'));
app.set('view engine', 'html');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));
/**
 * Readable Stream
 * Emits @data - Event to read the new data
 * Emits @end - event to when there is no more data to read
 */


//create ReadableStram
const readableStream = fs.createReadStream('./input.txt');

// listen for data events
readableStream.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data`);
  });
  
  // listen for the end of the stream
  readableStream.on('end', () => {
    console.log('No more data');
  });
  
  // listen for errors
  readableStream.on('error', (err) => {
    console.error(`Error: ${err}`);
  });


/**
 * Writable Stream
 * Emits @data - Event to read the new data
 * Emits @end - event to when there is no more data to read
 */

  // create a writable stream
const writableStream = fs.createWriteStream('./output.txt');

// write data to the stream
writableStream.write('Hello, world!\n');
writableStream.write('How are you today?\n');



/**
 * Duplex Stream
 * Reading from Input .txt Data and Write in output.txt
 */

// pipe data from the readable stream to the writable stream
readableStream.pipe(writableStream);

// end the stream
//writableStream.end();
