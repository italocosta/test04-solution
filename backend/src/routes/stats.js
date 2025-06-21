const express = require('express');
const router = express.Router();

const {getItems} = require('../repositories/itemRepository');
const {events} = require("../repositories/dataSource");
const { mean } = require('../utils/stats')

let cachedStats = null;

events.on('dataUpdated', async () => {
    const items = await getItems();
    cachedStats = performStats(items);
})

function performStats(items) {
    return {
        total: items.length,
        averagePrice: mean(items.map(i => i.price))
    }
}

// GET /api/stats
router.get('/', async (req, res, next) => {
    try {
        if (cachedStats) return res.send(cachedStats);

        const items = await getItems();
        cachedStats = performStats(items);
        res.json(cachedStats);
    } catch (err) {
        next(err);
    }
});

module.exports = router;