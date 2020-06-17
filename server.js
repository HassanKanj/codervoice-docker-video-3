const express     = require('express');
const bodyParser  = require('body-parser');
const app         = express();
const MongoClient = require('mongodb').MongoClient;
const path        = require('path');

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');

mongoURL       = 'mongodb://mongodb-container:27017';
const client   = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((error, database) => {
db = database.db("products_db")

 // The server will listen to port 3000
 app.listen(3000, function () {
     console.log('listening on port 3000 [http://localhost:3000]');
 })
})

// route for the css file
app.get('/custom.css', (request, response) => {
   response.sendFile(path.join(__dirname + '/custom.css'))
});

// route for the main page
app.get('/', (request, response) => {
    db.collection('products').find().toArray(function(error, result){
        if(error) {
            return console.log(error);
        }
        response.render('index.ejs', {products:result});
    });
});

// the route to add product
app.post('/add-product', (request, response) => { 
    db.collection('products').save(request.body, (error, result) => {
      if(error) {
          return console.log(error);
      }
      console.log('The product was saved to the database');
      response.redirect('/');
    })
  })