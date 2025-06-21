const {getData, saveData, events} = require('../repositories/dataSource');

let cachedItems = null;

events.on('dataUpdated', async () => {
    const raw = await getData();
    cachedItems = JSON.parse(raw);
})

async function getItems() {
    if (cachedItems) return cachedItems;

    const raw = await getData();
    cachedItems = JSON.parse(raw);
    return cachedItems;
}

async function saveItems(items) {
    await saveData(items);
}

module.exports = {
    getItems,
    saveItems,
}