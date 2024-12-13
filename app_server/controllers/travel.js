const request = require('request');
const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const apiOptions = {
    server: 'http://localhost:3000' // Replace with your actual server URL
};

// render the trips list view
const renderTripList = (req, res, responseBody) => {
    let message = null;
    let pageTitle = packageJson.description + ' | Travel';

    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = 'No trips exist in database';
        }
    }

    // render the page
    res.render('travel', {
        activePage: 'travel',
        title: pageTitle,
        trips: responseBody,
        message
    });
};

/* GET travel list view */
const tripList = (req, res) => {
    const path = '/api/trips';
    // construct the request
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    console.info('>> travelController.travelList calling ' + requestOptions.url);

    // make the request
    request(
        requestOptions,
        (err, { statusCode }, body) => {
            if (err) {
                console.error(err);
            }
            console.log('statusCode: ', statusCode);
            renderTripList(req, res, body);
        }
    );
};

module.exports = {
    tripList
};