const mongoose = require('mongoose');

async function connectDB(url) {
    try {
        await mongoose.connect(url);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

module.exports = { connectDB }