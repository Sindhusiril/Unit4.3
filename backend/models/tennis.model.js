var mongo = require('mongoose');

var playersSchema = mongo.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        country: {
            type: String,
            required: false,
            trim: true
        },
        ranking: {
            type: Number,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        height: {
            type: String,
            required: false,
            trim: true
        },
        handedness: {
            type: String,
            required: true,
            trim: true
        },
        titles: {
            type: Number,
            required: true
        }
    },
    {
        versionKey: false
    })

module.exports = mongo.model('Tennis', playersSchema, 'players');