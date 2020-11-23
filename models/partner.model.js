const mongoose = require("mongoose")
const Schema = mongoose.Schema
const partnerSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    
    cif: {
        type: String,
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



const Partner = mongoose.model('Partner', partnerSchema)      

module.exports = Partner