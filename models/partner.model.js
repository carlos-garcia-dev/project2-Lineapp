const mongoose = require("mongoose")
const eventSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,

    },
    
    cif: {
        type: Number,
        required: true,
    },

    fiscalName: {
        type: String,
        required: true,
    },

    direction: {
        type: String,
        required:true,
    },
    

},{
    timestamps: true,
})



const Partner = mongoose.model('Partner', eventSchema)      

module.exports = Parter