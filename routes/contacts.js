const express = require('express');
const c_router = express.Router();

c_router.get('/', (req, res) => {
    res.send('contacts 이후 url');
});

c_router.get('/list', (req, res) => {
    res.send('contacts list');
});

module.exports = c_router;
module.exports.a = 'hello';