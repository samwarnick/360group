var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var candidateSchema = new Schema({
  name: String,
  party: String,
  bio: String,
  social: {
    facebook: String,
    twitter: String,
    instagram: String,
  }
});

var Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
