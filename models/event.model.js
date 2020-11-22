const mongoose = require("mongoose")
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },

    duration: {
        type: Number,
        min: 30,
        max: 60,
        required: true,
    },

    date: {
        type: Number,
        required: true,
    },

    genre: {
        type: String,
        enum: ['pop', 'rock', 'techno', 'indie', 'jazz'],
        required: true,
    },

    location: {
        type: String,
        required: true
    },

    coords: {
        type: [Number],
        required: true,
    },

    partner: {
        type: Schema.Types.ObjectId,
        ref: 'Partner'
    },

    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
})

eventSchema.index({
    location: '2dsphere'
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event