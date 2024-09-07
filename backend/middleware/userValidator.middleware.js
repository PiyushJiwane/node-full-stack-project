const { check, body, validationResult } = require('express-validator');
const logger = require('../logging/logger');
const { username_validBody, password_validBody, email_validBody, otp_validBody } = require('./commonValidator');

const userValidator = [
    username_validBody,
    email_validBody,
    password_validBody,
    otp_validBody,

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