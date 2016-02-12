var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

var CitySchema = new Schema({
  cityName : String,
  creationDate : Date,
  active : Boolean
});

module.exports = mongoose.model('City', CitySchema);
