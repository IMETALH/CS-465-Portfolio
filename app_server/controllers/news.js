const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const theNewsObject = JSON.parse(fs.readFileSync('app_server/data/news.json', 'utf8'));

// Convert the object to an array
const theNews = Object.values(theNewsObject);

const latestNews = theNews.filter(news => news.type === 'latestNews');
const vacationTips = theNews.filter(news => news.type === 'vacationTips');
const featuredNews = theNews.find(news => news.type === 'featuredNews'); // Find the first match

/* GET news view. */
const news = (req, res) => {
    const pageTitle = packageJson.description + ' | News';
    res.render('news', { activePage: 'news', title: pageTitle, latestNews, vacationTips, featuredNews });
};

module.exports = {
    news
};
