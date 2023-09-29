const {Carrier} = require("../models/carrier");

const rootHandler = (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.send('<center><h1>404</h1><h2>Page was not found.</h2></center>')
}

module.exports = rootHandler