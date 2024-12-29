	const InstaProfiles = require('../models/instaProfiles');

// Get all profiles
const getProfiles = async (req, res) => {

    try {

        const instaProfiles = await InstaProfiles.find();
        res.json(instaProfiles);

    } catch(error) {

        res.status(500).json({ message: error.message});
    }    

}

// Get profile by id 
// Middeware
const getSingleProfile = async (req, res) => {

    // instaProfile comes from middleware
    res.json(res.instaProfile);  
}

// Post instagram profile
// Middleware
const createInstaProfile = async (req, res) => {

    const instagramProfile = new InstaProfiles({

        profileName: req.body.profileName,
        typeProfile: req.body.typeProfile
    });

    try {

        const newInstaProfile = await instagramProfile.save();
        res.status(201).json(newInstaProfile);

    } catch(error) {

        res.status(400).json({ message: error.message });

    }
    

    // res.json({ profile: "created" });
}

// Update a record
// Middleware
const updateInstaProfile = async (req, res) => {

    // instaProfile is Take and validate from middleware
    if (req.body.profileName != null) {

        res.instaProfile.profileName = req.body.profileName;
    }

    if (req.body.typeProfile != null) {

        res.instaProfile.typeProfile = req.body.typeProfile;
    }

    // end middleware capture

    try {

        const updateInstaProfile = await res.instaProfile.save();
        res.status(201).json(updateInstaProfile);

    } catch(error) {

        res.status(400).json({ message: error.message });    

    }

}

// Delete by id
// Middleware
const deleteInstaProfile = async (req, res) => {

    try {
        // Middleware
       await res.instaProfile.deleteOne();
       res.json({ msg: 'Profile deleted'})

    } catch(error) {

        res.status(400).json({ message: error.message })
    }
};


// Middleware to find profile by id
const getInfoById = async (req, res, next) => {

    let instaProfile;
    
    try {
        
       instaProfile = await InstaProfiles.findById(req.params.id);
       
       if (instaProfile === null) {

            return res.status(404).json({ message: 'Cannot find the instagram profile' });

       }

    } catch (error) {
        
        return res.status(500).json({ message: error.message });
    }

    res.instaProfile = instaProfile;
    next();

}


module.exports = { 
                    getInfoById, 
                    getProfiles, 
                    getSingleProfile,
                    createInstaProfile, 
                    updateInstaProfile,
                    deleteInstaProfile 
                    };