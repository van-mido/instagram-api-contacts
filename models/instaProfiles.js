const mongoose = require('mongoose');

const intagramProfiles = new mongoose.Schema({

    profileName: {
        type: String,
        required: true
    },
    
    typeProfile: {

        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    }

});

module.exports = new mongoose.model('InstaProfiles', intagramProfiles)