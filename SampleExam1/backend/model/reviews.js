import mongoose from 'mongoose';
const contactSchema  = new mongoose.Schema({
    rating: {type: String, required: true},
    body: {type: String, required: true},
    reviewer: {type: String, required: true},
    book: {type: String, required: true},
    createdOn: {type: Date, "default": Date.now}, 
});

export default mongoose.model('Review', contactSchema);