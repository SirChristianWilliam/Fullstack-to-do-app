// Import the pg library (our postgres db "driver")
const pg = require('pg');
// "pool" is another word for "connection"
// Here we are setting up our connection to the DB
const pool = new pg.Pool({
    host: 'localhost',  // on AWS, will look like rds.amazon.com
    port: 5432,
    database: 'weekend-to-do-app' 
});
// ⬇️ Export the pool, for anyone to use 
module.exports = pool;