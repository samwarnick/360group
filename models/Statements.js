var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statementSchema = new Schema({
  statement: String,
  demographics: []
});

var Statement = mongoose.model('Statement', statementSchema);

module.exports = Statement;
