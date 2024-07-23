const { body, validationResult } = require('express-validator');
const logger = require('../logging/logger');

const emailValidator=[
    body('email').isEmail().normalizeEmail().withMessage('Invalid email'),

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

module.exports=emailValidator