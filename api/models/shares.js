const mongoose = require('mongoose');

const sharesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    shares: { type: Number, default: 1 }
})

module.exports = mongoose.model('Shares', sharesSchema);