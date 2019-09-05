// require('dotnev').config();
// code away!
const server = require('./server.js');
const defaults = require('./config/defaults');

server.listen(defaults.port, () => console.log(`\n**API on port ${defaults.port}`))