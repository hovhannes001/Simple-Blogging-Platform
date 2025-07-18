const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
  mongoose.connect(mongoURI)
    .then(()=> console.log('MongoDB connected'))
    .catch(error => console.error('MongoDB connection error:', error));
};

module.exports = connectDB;
