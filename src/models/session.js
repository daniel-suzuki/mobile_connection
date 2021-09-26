const mongoose = require('mongoose');
const shortId = require('shortid');

const SessionSchema = mongoose.Schema({
    id: {
        required: true,
        type: String,
        default: shortId.generate
    },
    code: {
        type: String,
        default: ''
    },
    createdAt: {
        required: true,
        type: Date,
        default: new Date()
    },
    verified: {
        required: true,
        type: Boolean,
        default: false
    }
});

const Session = mongoose.model("Session", SessionSchema);

module.exports = Session;