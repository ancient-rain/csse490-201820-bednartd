const mongoose = require('mongoose');
const contactSchema  = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: String,
    homePhone: String,
    cellPhone: String,
    birthDay: Date,
    website: String,
    address: String
});

mongoose.model('Contact', contactSchema);