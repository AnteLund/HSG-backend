var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;
var CommentSchema   = new Schema({
    commentText: String,
    authur: String,
    creationDate: Date
});

module.exports = mongoose.model('Comment', CommentSchema);
