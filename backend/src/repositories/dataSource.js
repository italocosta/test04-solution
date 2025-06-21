const fs = require('fs/promises');
const fssync = require('fs');
const path = require('path');
const EventEmitter = require('events');
const events = new EventEmitter();

const DATA_PATH = path.join(__dirname, '../../../data/items.json');

fssync.watch(DATA_PATH, () => {
    console.log('The data has been updated, the cache is now invalidated.');
    events.emit('dataUpdated');
})

async function getData() {
    return await fs.readFile((DATA_PATH), 'utf8');
}

async function saveData(data) {
    await fs.writeFile(DATA_PATH, JSON.stringify(data), 'utf8');
}

module.exports = {
    getData,
    saveData,
    events
}