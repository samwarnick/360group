// setup Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var findOrCreate = require('mongoose-findorcreate')

var User = require('./user.js');

// Item schema
var statementSchema = new Schema({
    candidate: String,
    quote: String,
    topic: String,
    raw: []
});

// ensure schemas use virtual IDs
statementSchema.set('toJSON', {
    virtuals: true
});

// add findorCreate
statementSchema.plugin(findOrCreate);

// create item
var Statement = mongoose.model('statements', statementSchema);

module.exports = Statement;
