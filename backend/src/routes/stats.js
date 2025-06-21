const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const DATA_PATH = path.join(__dirname, '../../../data/items.json');

let cachedData = null;

function performStats(items) {
    return {
        total: items.length,
        averagePrice: items.reduce((acc, cur) => acc + cur.price, 0) / items.length
    }
}

// GET /api/stats
router.get('/', (req, res, next) => {
    if (cachedData) return res.send(cachedData);

    fs.readFile(DATA_PATH, (err, raw) => {
        if (err) return next(err);
        try {
            const items = JSON.parse(raw);
            cachedData = performStats(items);
            res.json(cachedData);
        } catch (err) {
            next(new Error('Could not perform stats'));
        }
    });
});

module.exports = router;