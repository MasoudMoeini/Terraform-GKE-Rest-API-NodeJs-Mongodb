//require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const mongoUser= process.env.RESTNODE_DB_USERNAME || '';
const mongoPass= process.env.RESTNODE_DB_PASSWORD || '';
const mongoAuth = mongoUser && mongoPass ? `${mongoUser}:${mongoPass}@` : '';
const mongoHost= process.env.RESTNODE_DB_HOST || 'localhost';
const mongoPort = process.env.MONGO_PORT || 27017;
const mongoDb = process.env.MONGO_DB || 'my_database';
const connString = process.env.MONGODB_CONNSTRING || `mongodb://${mongoAuth}${mongoHost}:${mongoPort}/${mongoDb}?authSource=admin`

//Set up default mongoose connection
mongoose.connect(connString, {useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
//Get the default connection
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

//Set up API transactions 
app.use(express.json())
const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });