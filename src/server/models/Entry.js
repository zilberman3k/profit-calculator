const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Date, Number, String} = Schema.Types;

const entrySchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    coin: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    valueAtBuying: {
        type: Number,
        required: false
    }
});

entrySchema.index({'$**': 'text'});


module.exports = mongoose.model('Entry', entrySchema);