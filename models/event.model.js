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
        required: true,
    },

    duration: {
        type: Number,
        min: 30,
        max: 500,
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },

    genre: {
        type: String,
        enum: ['pop', 'rock', 'techno', 'indie', 'jazz'],
        required: true,
    },

    location: {
        type: {
            type: String,
        },
            coords: {
        type: [Number],
    },
    },

    partner: [{
        type: Schema.Types.ObjectId,
        ref: 'Partner'
    }],

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