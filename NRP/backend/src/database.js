const mongoose = require('mongoose');
const URI = 'mongodb://localhost/NPR';

mongoose.connect(URI, {

useNewUrlParser: true, 

useUnifiedTopology: true 

}, err => {
if(err) throw err;
console.log('Connected to MongoDB!!!')


});