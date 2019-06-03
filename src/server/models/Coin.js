const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {String} = Schema.Types;

const coinSchema = new Schema({
    id: {type: String},
    name: {type: String},
    symbol: {type: String},
    rank: {type: String},
    slug:{type:String}
});

coinSchema.index({'$**': 'text'});

module.exports = mongoose.model('Coin', coinSchema);
