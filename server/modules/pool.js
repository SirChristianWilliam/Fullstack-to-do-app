// Import that pg library (our postgres db "driver")
const pg = require('pg');

// Make a pool 🚰 🦆 🏊
// 
// "pool" is another word for "connection"
// Here we are setting up our connection to the DB
const pool = new pg.Pool({
    host: 'localhost',  // on AWS, will look like rds.amazon.com
    port: 5432,
    database: 'weekend-to-do-app'
});


// Export the pool, for anyone to us
// Jump in, the water's warm 
module.exports = pool;