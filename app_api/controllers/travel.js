const mongoose = require('mongoose');
const tripModel = mongoose.model('trips');
const userModel = mongoose.model('users');

// GET: /trips - return list of all trips
const tripList = async (req, res) => {
    try {
        const trips = await tripModel 
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
        const trip = await tripModel.findOne({ 'code': req.params.tripCode });
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
    try {
        console.log('Attempting to add a trip with the following data:', req.body);

        // Ensure the user is authenticated using getUser
        getUser(req, res, async () => {
            // Create the trip using the validated data from the request
            const trip = await tripModel.create({
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description,
            });

            console.log('Trip added successfully:', trip);

            // Respond with the created trip
            return res.status(201).json(trip);
        });
    } catch (err) {
        console.error('Error adding trip:', err);

        // Handle validation errors or other issues
        return res.status(400).json({
            message: 'Error adding trip',
            error: err.message || err,
        });
    }
};


// PUT: Update a single trip by tripCode
const tripsUpdateTrip = async (req, res) => {
    try {
        console.log(`Updating trip with code: ${req.params.tripCode}`, req.body);

        // Wrap the logic with getUser to ensure authentication/authorization
        getUser(req, res, async () => {
            // Find and update the trip
            const updatedTrip = await tripModel.findOneAndUpdate(
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
                { new: true, runValidators: true } // Return the updated document and run validators
            );

            // Handle case where trip isn't found
            if (!updatedTrip) {
                return res.status(404).json({
                    message: `Trip not found with code ${req.params.tripCode}`,
                });
            }

            // Respond with the updated trip
            return res.status(200).json(updatedTrip);
        });
    } catch (error) {
        console.error('Error updating trip:', error);

        // Handle invalid ObjectId errors or other validation issues
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                message: `Invalid tripCode: ${req.params.tripCode}`,
            });
        }

        // General server error
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};


// DELETE: /trips/:tripCode - delete a single trip
const tripsDeleteTrip = async (req, res) => {
    try {
        console.log(`Deleting trip with code: ${req.params.tripCode}`);

        const tripCode = req.params.tripCode?.trim();

        // Check if trip code is provided
        if (!tripCode) {
            return res.status(400).json({ message: 'Trip code is required for deletion.' });
        }

        // Wrap logic with getUser to ensure proper authentication/authorization
        getUser(req, res, async () => {
            // Attempt to delete the trip by trip code
            const deletedTrip = await tripModel.findOneAndDelete({ code: tripCode });

            // Handle case where the trip isn't found
            if (!deletedTrip) {
                return res.status(404).json({
                    message: `Trip not found with code ${tripCode}`,
                });
            }

            // Respond with a success message if the trip was deleted
            return res.status(200).json({ message: `Trip ${tripCode} deleted successfully` });
        });
    } catch (error) {
        console.error('Error during deletion:', error);

        // Handle potential errors, including invalid trip codes or server issues
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                message: `Invalid tripCode: ${req.params.tripCode}`,
            });
        }

        // General server error handling
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};


// Return the user name if authenticated
const getUser = (req, res, callback) => {
    if (req.auth && req.auth.email) {
        userModel
            .findOne({ email: req.auth.email })
            .exec((err, user) => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                } else if (err) {
                    console.error('Error finding user:', err);
                    return res.status(500).json(err);
                }
                req.user = user; // Attach user object to req for further use
                callback();
            });
    } else {
        return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }
};


module.exports = {
    tripList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};