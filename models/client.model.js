const mongoose = require("mongoose")
const clientSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,

    },

    surname: {
       type: String,
        required: true, 
    },

    username: {
        type: String,
        required: true,
        
    },
    
    id: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        validate: {
            validator: text => text.endsWith('TO-DO'),
            message: 'Use a valid mail'
        }
    },

    creditcard: {
        type: Number,
        required: true,
    },


},{
    timestamps: true,
})



const Client = mongoose.model('Client', clientSchema)      

module.exports = Client