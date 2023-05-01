const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://aKuma:*******@supercuster.guubw.mongodb.net/?retryWrites=true&w=majority');

const objetodb = mongoose.connection;

objetodb.on('connected', () => {
    console.log('MongoDB is connected');
});

objetodb.on('error', () => {
    console.log('error MongoDB connection');
});

module.exports = mongoose;