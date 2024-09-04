let mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.MONGO_URL;

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connected to MongoDB server successfully");
})
db.on('error', (err) => {
    console.log("error occured" , err);
})
db.on('disconnected', () => {
    console.log("Disconnected to MongoDB server successfully");
})