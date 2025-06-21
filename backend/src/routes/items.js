const express = require('express');
const Fuse = require('fuse.js')
const {v4: uuidv4} = require('uuid');
const router = express.Router();

const {getItems, saveItems} = require('../repositories/itemRepository');


// GET /api/items
router.get('/', async (req, res, next) => {
  try {
    let items = await getItems();
    const { limit, q } = req.query;

    if (q) {
      const fuse = new Fuse(items, {
        keys: ['name'],
        threshold: 0.3,
        ignoreLocation: true
      });
      items = fuse.search(q).map(r => r.item)
    }

    if (limit) {
      items = items.slice(0, parseInt(limit));
    }

    res.json(items);
  } catch (err) {
    next(err);
  }
});

// GET /api/items/:id
router.get('/:id', async (req, res, next) => {
  try {
    const items = await getItems();
    const item = items.find(i => i.id === req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// POST /api/items
router.post('/', async (req, res, next) => {
  try {
    const item = req.body;

    if(!isValidRequest(item))
      return res.status(400).json({ error: 'Invalid request body' });

    const items = await getItems();

    item.id = uuidv4();
    items.push(item);

    await saveItems(items);

    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

function isValidRequest(item) {
  return item.name
      && item.category
      && typeof item.price === 'number';
}

module.exports = router;