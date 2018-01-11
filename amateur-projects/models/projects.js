const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    author: {type: String, required: true},
    commentText: {type: String, required: true},
    createdOn: {
        type: Date,
        "default": Date.now
    }
});
const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    comments: [commentSchema],
    email: String,
    owner: String
});

module.exports = mongoose.model('Project', projectSchema);