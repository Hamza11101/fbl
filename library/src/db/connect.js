const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Library').then(()=>{
    console.log('Suceessfully connected to database');
}).catch((err)=>{
    console.log(err);
    console.log('Not coonnected to database');
})