// getting-started.js
const mongoose = require('mongoose');
const options = {
    useNewUrlParser: true,
};

const autopopulate = async () => {
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('connection open');
    });
    await db.dropCollection('kittens');

    var kittySchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.Mixed,
        name: String
    });
  
    kittySchema.methods.speak = function () {
        var greeting = this.name
            ? 'Meow name is ' + this.name
            : 'I don\'t have a name';
        console.log(greeting);
    };
  
    var Kitten = mongoose.model('Kitten', kittySchema);
  
    var silence = new Kitten({ _id: '1', name: 'Cat' });
  
    await silence.save();
    db.close();
  
};

mongoose.connect('mongodb://root:root@mongo:27017/test?authSource=admin', options);
var db = mongoose.connection;
autopopulate();

