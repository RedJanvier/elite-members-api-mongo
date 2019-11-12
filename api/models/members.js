const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    email: {type: String, required: true},
    location: {type: String, required: true},
    committee: {type: String},
    image: {type: String, required: true},
    shares: {type: Number, default: 1}
})

module.exports = mongoose.model('Member', memberSchema);