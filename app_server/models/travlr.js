const mongoose = require('mongoose');

// Define the trip schema
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
mongoose.model('Trip', tripSchema);