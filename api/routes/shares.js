const express = require('express');
const router = express.Router();
const Shares = require('../models/shares');

router.get('/', (req, res, next) => {
    Shares.find().exec()
    .then(shares => {
        res.status(200).json(shares);
    })
    .catch(err => res.status(500).json({ error: err }));

})

module.exports = router;
