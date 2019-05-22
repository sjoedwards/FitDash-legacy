const mongoose = require('mongoose');
const options = {
    useNewUrlParser: true,
};

const cycles = require('./Cycles');
const blocks = require('./Blocks');
const exercises = require('./Exercises');
const sessions = require('./Sessions');
const sessionExercises = require('./SessionExercises');

const cycleSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.Mixed,
    name: String
});

const blockSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.Mixed,
    name: String
});

const exerciseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.Mixed,
    name: String,
});

const sessionExerciseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.Mixed,
    reps: Number,
    sets: Number,
    rest: Number,
    tempo: String,
    sessionId: Number
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