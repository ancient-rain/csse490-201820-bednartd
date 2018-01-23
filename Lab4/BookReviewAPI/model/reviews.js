const mongoose = require('mongoose');
const contactSchema  = new mongoose.Schema({
    rating: {type: String, required: true},
    body: {type: String, required: true},
    reviewer: {type: String, required: true},
    book: {type: String, required: true},
    createdOn: {type: Date, "default": Date.now}, 
});

module.exports = mongoose.model('Review', contactSchema);