const mongoose = require('mongoose');

const cycles = require('./Cycles');
const blocks = require('./Blocks');
const exercises = require('./Exercises');
const sessions = require('./Sessions');
const sessionExercises = require('./SessionExercises');

const options = {
    useNewUrlParser: true,
};

const cycleSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.Mixed,
    name: String
});

const blockSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.Mixed,
    name: String,
    cycle: Number
});

const sessionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.Mixed,
    name: String,
    block: Number
});

const exerciseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.Mixed,
    name: String,
});

const sessionexerciseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.Mixed,
    reps: Number,
    sets: Number,
    rest: Number,
    tempo: String,
    sessionId: Number
});

const dropCollections = collections => {
    return collections.map(async collection => {
        try {
            return await db.dropCollection(collection);
        } catch (e) {
            if (e.message === 'ns not found') {
                console.log(`Collection '${collection}' does not exist`);
            } else {
                console.log(e);
            }
            return Promise.resolve();
        }
    });
};

const importCollection = (name, data, schema) => {
    return data.map(async object => {
        const Model = mongoose.model(name, schema);
        const item = new Model(object);
        return await item.save();
    });
};

const autoImport = async() => {
    await Promise.all(dropCollections(['cycles', 'blocks', 'exercises', 'sessions', 'sessionExercises']));
    await Promise.all(importCollection('Cycles', cycles, cycleSchema));
    await Promise.all(importCollection('Blocks', blocks, blockSchema));
    await Promise.all(importCollection('Exercises', exercises, exerciseSchema));
    await Promise.all(importCollection('Sessions', sessions, sessionSchema));
    await Promise.all(importCollection('SessionExercises', sessionExercises, sessionexerciseSchema));

    db.close();
};

mongoose.connect('mongodb://root:root@mongo:27017/fitdash?authSource=admin', options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connection open');
    autoImport();
});
