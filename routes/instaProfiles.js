const express = require('express');
const router = express.Router();

// Import controllers
const { 
        getInfoById, 
        getProfiles, 
        getSingleProfile, 
        createInstaProfile,
        updateInstaProfile,
        deleteInstaProfile

     } = require('../controllers/instaProfiles');

// Route without middleware
router.route('/').get(getProfiles).post(createInstaProfile);

// Route with middleware getInfoById function
router.route('/:id').get(getInfoById, getSingleProfile)
                    .put(getInfoById, updateInstaProfile)
                    .delete(getInfoById, deleteInstaProfile);


module.exports = router;