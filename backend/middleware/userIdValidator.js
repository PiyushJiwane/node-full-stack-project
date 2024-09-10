const { check, body, validationResult } = require('express-validator');
const logger = require('../logging/logger');
const { email_validBody, password_validBody, objectId_validParam } = require('./commonValidator');

const userIdValidator = [
    objectId_validParam,
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

module.exports = userIdValidator