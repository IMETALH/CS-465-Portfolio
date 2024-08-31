// require('dotenv').config();

const fs = require('fs');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const trips = JSON.parse(fs.readFileSync('app_server/data/trips.json', 'utf8'));
// const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

/* Get travel view */
/*
const travel = (req, res) => {
    pageTitle = process.env.npm_package_description + ' - Travel';
    res.render('travel', { title: pageTitle, trips });
}; */

const travel = (req, res) => {
    pageTitle = packageJson.description + ' | Travel';
    res.render('travel', { title: pageTitle, trips });
};

module.exports = {
    travel
}
