const mongoose = require('mongoose');
const model = mongoose.model('trips');

// GET: /trips - return list of all trips
const tripList = async (req, res) => {
    try {
        const trips = await model 
        .find({}); 
        if (!trips) {
            return res
                .status(404)
                .json({ "message": "trips not found" });
        } else {
            return res
                .status(200)
                .json(trips);
        }
    } catch (err) {
        return res
            .status(404)
            .json(err);
    }
};

// GET: /trips/:tripCode - return a single trip
const tripsFindCode = async (req, res) => {
    try {
        const trip = await model.findOne({ 'code': req.params.tripCode });
        if (!trip) {
            return res
                .status(404)
                .json({ "message": "trip not found" });
        } else {
            return res
                .status(200)
                .json(trip);
        }
    } catch (err) {
        return res
            .status(404)
            .json(err);
    }
};

const tripsAddTrip = async (req, res) => {
    model
        .create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        },
            (err, trip) => {
                if (err) {
                    return res
                        .status(400)  // bad request, invalid content
                        .json(err);
                } else {
                    return res
                        .status(201) // created
                        .json(trip);
                }
            });
}

// PUT: Update a single trip by tripCode
const tripsUpdateTrip = async (req, res) => {
    try {
        console.log(`Updating trip with code: ${req.params.tripCode}`, req.body);

        // Find and update the trip
        const updatedTrip = await 
        model
        .findOneAndUpdate(
            { code: req.params.tripCode }, // Match trip by code
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description,
            },
            { new: true, runValidators: true } // Return the updated document
        );

        // Handle case where trip isn't found
        if (!updatedTrip) {
            return res.status(404).json({
                message: `Trip not found with code ${req.params.tripCode}`,
            });
        }

        // Respond with the updated trip
        res.status(200).json(updatedTrip);
    } catch (error) {
        console.error('Error updating trip:', error);

        // Handle invalid ObjectId errors or other validation issues
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                message: `Invalid tripCode: ${req.params.tripCode}`,
            });
        }

        // General server error
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

// DELETE: /trips/:tripCode - delete a single trip
const tripsDeleteTrip = async (req, res) => {
    try {
        console.log(`Deleting trip with code: ${req.params.tripCode}`);

        const tripCode = req.params.tripCode?.trim();
        if (!tripCode) {
            return res.status(400).json({ message: 'Trip code is required for deletion.' });
        }

        // Attempt to delete the trip by trip code
        const deletedTrip = await 
        model
        .findOneAndDelete({ code: tripCode });

        if (!deletedTrip) {
            return res.status(404).json({
                message: `Trip not found with code ${tripCode}`,
            });
        }

        // Respond with a success message if the trip was deleted
        res.status(200).json({ message: `Trip ${tripCode} deleted successfully` });

    } catch (error) {
        console.error('Error during deletion:', error);

        // Handle potential errors, including invalid trip codes or server issues
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                message: `Invalid tripCode: ${req.params.tripCode}`,
            });
        }

        // General server error handling
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

module.exports = {
    tripList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};