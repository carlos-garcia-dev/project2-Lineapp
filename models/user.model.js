const mongoose = require("mongoose")
const eventSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,

    },

    surname: {
       type: String,
        required: true, 
    },

    nickname: {
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

    billNumber: {
        type: Number,
        required: true,
    },


},{
    timestamps: true,
})



const User = mongoose.model('User', userSchema)      

module.exports = User