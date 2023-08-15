const mongoose = require('mongoose');
const model = mongoose.model('trips'); // Use the correct variable name 'model'
mongoose.set('debug', true);

// GET: /trips - lists all trips
const tripsList = async (req, res) => {
    model
        .find({}) // empty filter for all
        .then((trips) => {
            if (!trips || Object.keys(trips).length === 0) {
                return res
                    .status(404)
                    .json({ "message": "trips not found" });
            } else {
                return res
                    .status(200)
                    .json(trips);
            }
        }).catch((err) => {
            if (err) {
                return res.status(404)
            }
        });
};

// GET: /trips/:tripCode - returns a single trip
const tripsFindCode = async (req, res) => {
    console.log('Searching for trip code:', req.params.tripCode);
    model
        .findOne({ 'code': req.params.tripCode })
        .then((trip) => {
            console.log('Found trip:', trip);
            if (!trip) {
                console.log('Trip not found.');
                return res
                    .status(404)
                    .json({ "message": "trip not found" });
            } else {
                console.log('Sending trip data:', trip);
                return res
                    .status(200)
                    .json(trip);
            }
        }).catch((err) => {
            console.error('Error:', err);
            return res
                .status(500) // Internal Server Error
                .json({ "message": "An error occurred" });
        });
};



module.exports = {
    tripsList,
    tripsFindCode
};
