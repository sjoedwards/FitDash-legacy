const mongoose = require('mongoose');
const options = {
    useNewUrlParser: true,
};

const cycles = [{ _id: '1', name: 'Cycle 1' },{ _id: '2', name: 'Cycle 2' },{ _id: '3', name: 'Cycle 3' }];

var cycleSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.Mixed,
    name: String
});

const dropCollection = () => {
    return db.dropCollection('cycles');
};

const importCollection = (name, data, schema) => {
    return data.map(async object => {
        const Model = mongoose.model(name, schema);
        const item = new Model(object);
        return await item.save();
    });
};

const autoImport = async() => {
    await dropCollection();
    await Promise.all(importCollection('Cycles', cycles, cycleSchema));
    db.close();
};

mongoose.connect('mongodb://root:root@mongo:27017/test?authSource=admin', options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connection open');
});
autoImport();