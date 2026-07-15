const { body, validationResult } = require("express-validator");

// Validation rules
const validateProfile = [

    body("phone")
        .isLength({ min: 10, max: 10 })
        .withMessage("Phone number must be exactly 10 digits.")
        .isNumeric()
        .withMessage("Phone number must contain only digits."),

    body("gender")
        .isIn(["Male", "Female", "Other"])
        .withMessage("Invalid gender."),

    body("age")
        .isInt({ min: 1, max: 120 })
        .withMessage("Age must be between 1 and 120."),

    body("bloodGroup")
        .isIn([
            "A+",
            "A-",
            "B+",
            "B-",
            "AB+",
            "AB-",
            "O+",
            "O-"
        ])
        .withMessage("Invalid blood group.")
];

// Validation middleware
const handleValidation = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    next();
};

module.exports = {
    validateProfile,
    handleValidation
};