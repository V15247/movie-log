const mongoose = require('mongoose');
const User = require('./User');
const { boolean } = require('@hapi/joi');

const PostSchema = new mongoose.Schema( {

    postId:{
        type: String,
        required: true,
    },

    movieName: {
        type: String,
        min: 1,
        max: 100,
        required: true
    },

    description: {
        type: String,
        min: 6,
        max: 2048,
        required: true,
    }, 
    rating: {
        type: Number, 
        max: 10, 
        min: 0,
        required: true,
    },
    date : {
        type: String,
        default: Date.now(),
    },
    ifRewatched: {
        type: Boolean,
        default: false,
    }

})

module.exports = mongoose.model('Post', PostSchema);