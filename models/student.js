var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;
var StudentSchema   = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    exam: String,
    yearOfGraduation: String,
    cityOfInterest: [{cityName : String}],
    creationDate: Date
});

module.exports = mongoose.model('Student', StudentSchema);
