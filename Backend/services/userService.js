const User = require("../models/User");

const createProfile = async (userId, profileData) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    user.phone = profileData.phone;
    user.gender = profileData.gender;
    user.age = profileData.age;
    user.bloodGroup = profileData.bloodGroup;
    user.address = profileData.address;
    user.emergencyContact = profileData.emergencyContact;

    user.profileCompleted = true;

    await user.save();

    return user;
};

module.exports = {
    createProfile
};