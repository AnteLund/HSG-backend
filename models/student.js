var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;
var StudentSchema   = new Schema({
    firstName: String,
    lastName: String,
    email: String
});

module.exports = mongoose.model('Student', StudentSchema);
