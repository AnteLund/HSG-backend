var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;


var StudentSchema   = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    exam: String,
    yearOfGraduation: String,
    cityOfInterest: [{cityName : String}],
    roleOfInterest: [{roleName : String}],
    creationDate: Date,
    comments:[{
      commentText: String,
      authur: String,
      creationDate: Date}]
});

module.exports = mongoose.model('Student', StudentSchema);
