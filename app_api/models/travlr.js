const mongoose = require('mongoose');

// define trip schema
const tripSchema = new mongoose.Schema({
    code: { type: String, required: true, index: true },
    name: { type: String, required: true, index: true },
    length: { type: String, required: true, index: true },
    start: { type: Date, required: true, index: true },
    resort: { type: String, required: true, index: true },
    perPerson: { type: String, required: true, index: true },
    image: { type: String, required: true, index: true },
    description: { type: String, required: true, index: true }
});

// define rooms schema

// compile and export model
module.exports = mongoose.model('trips', tripSchema);