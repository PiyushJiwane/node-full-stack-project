const { body, validationResult } = require('express-validator');
const logger = require('../logging/logger');
const { email_validBody, password_validBody, otp_validBody} = require('./commonValidator');


const forgetPassValidator=[
    email_validBody,
    password_validBody,
    otp_validBody,
    
    // After validation, check for errors
    (req, res, next) => {
        console.log("forget pass validtor");
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error(errors.array()[0].msg)
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // If no errors, proceed to the next middleware (controller)
    }
]

module.exports=forgetPassValidator