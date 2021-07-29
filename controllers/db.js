const Pool = require("pg").Pool;

const connectionString = 'postgres://gxfksordolltzx:dc7609da8b509bf8abd0974583e681ee145c1abbd69969c59bb0d00a72cac1f1@ec2-35-174-56-18.compute-1.amazonaws.com:5432/d6ki6tc9uj9fr4'

const pool = new Pool({
    // user: 'gxfksordolltzx',
    // password: 'dc7609da8b509bf8abd0974583e681ee145c1abbd69969c59bb0d00a72cac1f1',
    // host: 'ec2-35-174-56-18.compute-1.amazonaws.com',
    // port: '5432',
    // database: 'd6ki6tc9uj9fr4',
    // sslmode: 'require'
    connectionString,
});

module.exports = pool;