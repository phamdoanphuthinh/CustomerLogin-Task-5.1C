const mongoose = require("mongoose")
const validator = require("validator")
const bodyParser = require("body-parser")
const customerSchema = new mongoose.Schema(
    {
        country_residence: {type: String, required: true},

        firstname:{type: String, required: true},

        lastname:{type: String, required: true},

        email: {
            type: String,
            trim:true,
            lowercase:true},
        password: {
            required: true,
             type: String,
            minLength: 8,
            },
        re_password: { type: String,
            required: true,
            minLength:8,
            },
        address:{ type:String, required:true},
        city:{type: String, required: true,},

        state:{type: String, required: true,
        },

        zip: String,

        mobile_number: Number
    })
    

    

module.exports = mongoose.model("Customer", customerSchema)
