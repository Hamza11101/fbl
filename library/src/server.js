require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
// app.use('/uploads', express.static('./src/uploads'));
// app.use('/generatedFiles', express.static('./generatedFiles'));

require("./db/connect");
require('./passPort/bearerStrategy');

app.use((err,req,res,next)=>{
    res.status(422).send({error:err.message})
});

app.use('/api/v1',require('./routes/user'));
app.use('/api/v1',require('./routes/auth'));
app.use('/api/v1',require('./routes/livre'));
app.use('/api/v1',require('./routes/categories'));
app.use('/api/v1',require('./routes/count'));






const port = process.env.port || 5000;
app.listen(port, () => console.log(`Listening on port ${port}!`));