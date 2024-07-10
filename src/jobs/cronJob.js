const cron = require('node-cron');
const fetchRSS = require('../services/fetchRSS');

// Schedule the task to run every 2 minutes
cron.schedule('*/2 * * * *', () => {
    console.log('Running cron job: Fetching RSS feed');
    fetchRSS();
});
