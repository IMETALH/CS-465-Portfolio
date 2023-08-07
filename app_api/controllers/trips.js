const mongoose = require('mongoose');
const model = mongoose.model('trips');

// GET: /trips - list all the trips
const tripsList = async (req, res) => {
    try {
        const trips = await model.find().exec();
        if (trips.length === 0) {
            return res.status(404).json({ "message": "Trips not found" });
        }
        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json({ "message": "Internal server error" });
    }
};

// GET: /trips/:tripCode - returns a single trip
const tripsFindCode = async (req, res) => {
    try {
        const tripCode = req.params.tripCode.trim();
        if (tripCode.length < 1) {
            return res.status(400).json({ "message": "Invalid trip code" });
        }

        const trip = await model.findOne({ 'code': tripCode }).exec();
        if (!trip) {
            return res.status(404).json({ "message": "Trip not found" });
        }
        return res.status(200).json(trip);
    } catch (err) {
        return res.status(500).json({ "message": "Internal server error" });
    }
};

module.exports = {
    tripsList,
    tripsFindCode
};
