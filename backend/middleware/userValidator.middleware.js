const { check, body, validationResult } = require('express-validator');
const logger = require('../logging/logger');

const userValidator = [
    // Validate and sanitize fields using express-validator
    body('username').trim().isLength({ min: 1 }).withMessage('Name must be specified'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'),
    body('otp').isLength({ min: 4, max: 4 })
        .withMessage('OTP must be exactly 4 digits')
        .isNumeric()
        .withMessage('OTP must be numeric'),

    // After validation, check for errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error(errors.array()[0].msg)
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // If no errors, proceed to the next middleware (controller)
    }
]

module.exports = userValidator