const logger = require("../logging/logger");
const bcrypt = require("bcrypt");
const OtpModel = require("../models/otp_model");
const userModel = require("../models/user_model");
require('dotenv/config')

const SALT_ROUND = Number(process.env.SALT_ROUND)

const checkUser = async (req, res) => {
    const { email } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        res.status(200).json({ "data": `email id : ${email} not present...!!!` })
    }
    res.status(400).json({ "data": `user with an email : ${email} already present in the db` })
    throw new Error(`user with an email : ${email} already present in the db`)
}

const sendOtp = async (req, res) => {
    const { email } = req.body
    console.log(email);

    try {
        const otp = Math.floor(Math.random() * (9999 - 1000) + 1000);

        const otpModeObject = new OtpModel({
            email,
            otp,
            expiresAt: Date.now() + 1 * 60 * 1000
        })

        const otpAfterSave = await otpModeObject.save()
        console.log(otpAfterSave);

        if (otpAfterSave._id) {
            res.status(201).json({
                "data": `your otp is: ${otp}`
            })
        } else {
            res.status(400).json({ "data": `facing issue while saving the otp data with email :${email}` })
            throw new Error(`facing issue while saving the otp data with email :${email}`)
        }
    } catch (error) {
        logger.error(error.message);
    }
}

const signup = async (req, res) => {
    const { username, email, password, otp } = req.body

    try {
        const otpRecord = await OtpModel.findOne({ email, otp });
        if (!otpRecord || otpRecord.expiresAt < Date.now()) {
            return res.status(400).json({ data: 'Invalid or expired OTP' });
        }


        const bcrypt_password = await bcrypt.hash(password, SALT_ROUND)

        const userModelObject = new userModel({ username, email, password: bcrypt_password })

        const userAfterSave = await userModelObject.save()

        if (userAfterSave._id) {
            res.status(201).json({
                "data": `data got saved successfully with an id : ${userAfterSave._id}`
            })
        } else {
            res.status(400).json({ "data": `facing issue while saving the data with email :${email}` })
            throw new Error(`facing issue while saving the data with email :${email}`)
        }
    } catch (error) {
        logger.error(error.message);
    }
}

const updateUser = (req, res) => {
    res.send("user updated")
}

const deleteUser = (req, res) => {
    console.log(typeof req.params.userId);
    res.send(`delete user with id : ${req.params.userId}`)
}

module.exports = {
    checkUser,
    signup,
    sendOtp,
    updateUser,
    deleteUser
}