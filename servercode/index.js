var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors'); 


var app = express();
const route = require('./route/routes.js');
mongoose.connect('mongodb://localhost:127.0.0.1:27017/shoppinglist', { 
    useNewUrlParser: true,
    useCreateIndex: true,  
    useFindAndModify: false
});
mongoose.connection.on('connected', ()=>{
    console.log('Connetced to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.log(err);
});

const PORT = 5000;
app.use(cors());
app.use(bodyparser.json());

app.use('/api', route);

app.get('/', (req,res) =>{
    res.send("Roger am here dude");
});

app.listen(PORT, ()=> {
    console.log('server started at port' + PORT);
});