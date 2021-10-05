const mongoose = require('mongoose');
const URI = 'mongodb://localhost/NPR';

mongoose.connect(URI, {

    useNewUrlParser: true,

    useUnifiedTopology: true

});


const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('DB connected');
});