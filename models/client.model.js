const mongoose = require("mongoose")
const Schema = mongoose.Schema
const clientSchema = new Schema({

    role: {
        type: String,
        enum: ['Admin', 'Partner', 'Client'],
        default: 'Client'
    },

    email: {
        type: String,
        validate: {
            validator: text => text.endsWith('.com'),
            message: 'Use a valid mail'
        }
    },

    username: {
        type: String,
        // required: true,

    },

    password: {
        type: String,
        // required: true,
    },

    name: {
        type: String,
        // required: true,

    },

    surname: {
        type: String,
        // required: true,
    },



    id: {
        type: String,
        // required: true,
    },



    creditcard: {
        type: Number,
        // required: true,
    },


    // Role Partner
    cif: {
        type: String,
        // required: true,
    },

    fiscalName: {
        type: String,
        // required: true,
    },

    direction: {
        type: String,
        // required: true,
    },

    //Admin

}, {
    timestamps: true,
})



const Client = mongoose.model('Client', clientSchema)

module.exports = Client