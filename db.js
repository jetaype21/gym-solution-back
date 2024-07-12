// db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'gymdb-rds.cxo8kw2skktg.us-east-1.rds.amazonaws.com',
    database: 'datos-gym',
    password: 'gymdb-rds',
    port: 5432, 
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
