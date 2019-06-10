const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Date,Number,String} = Schema.Types;

const entrySchema = new Schema({
    id:{
        type:String,
        required: true
    },
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
    amount:{
        type:Number,
        required: true
    }
});

entrySchema.index({'$**': 'text'});


module.exports = mongoose.model('Entry', entrySchema);