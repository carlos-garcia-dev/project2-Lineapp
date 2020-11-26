const mongoose = require("mongoose")
const Schema = mongoose.Schema

const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    pictureUrl: {
        type: String,

    },

    duration: {
        type: Number,

        required: true,
    },

    genre: {
        type: String,
        enum: ['pop', 'rock', 'techno', 'indie', 'jazz'],
        required: true,
    },

    latitude: {
        type: Number,
    },

    longitude: {
        type: Number,
    },

    location: {
        type: {
            type: String,
        },
        coordinates: {
            type: [Number],
        },
    },

    partner: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
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