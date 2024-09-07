const logger = require("../logging/logger");
const bcrypt = require("bcrypt");
const userModel = require("../models/user_model");
const OtpModel = require("../models/otp_model");
const generateJWTToken = require("../middleware/jwtToken");
require('dotenv/config')

const SALT_ROUND = Number(process.env.SALT_ROUND)

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const result = await userModel.findOne({ email })
        console.log(result);

        const hashedPassword = await bcrypt.compare(password, result.password)

        if (email && hashedPassword) {
            console.log("true")
            const jwt_token = await generateJWTToken(result)
            console.log(jwt_token);
            res.status(200).json({ jwt_token })
            return
        }
        console.log("error");
        res.status(400).json({ "data": `facing issue while logging with email :${email}` })
        throw new Error(`facing issue while logging with email :${email}`)
    } catch (error) {
        logger.error(error.message);
    }
}

const updateUser = async (req, res) => {
    const { userId } = req.params
    const { username } = req.body
    // ------Direct--------
    // const userDoc=await userModel.findByIdAndUpdate({_id:userId},{username})
    // console.log(userDoc);
    // if(userDoc){
    //     res.status(200).json({ "data": `id : ${userId} got updated...!!!` })
    // }else{
    //     res.status(400).json({ "data": `id : ${userId} has same issue...!!!` })
    //     throw new Error(`id : ${userId} has same issue...!!!`)
    // }

    // ------InDirect-------
    try {
        const user = await userModel.findOne({ _id: userId })
        if (!user) {
            res.status(200).json({ "data": `id : ${user._id} is not present...!!!` })
            return
        }
        const updatedUser = await userModel.updateOne({ _id: userId }, { username })
        console.log(updatedUser);
        if (updatedUser.acknowledged) {
            res.status(200).json({ "data": `id : ${userId} got updated...!!!` })
            return
        }
        res.status(400).json({ "data": `id : ${userId} has same issue...!!!` })
        throw new Error(`id : ${userId} has same issue...!!!`)
    } catch (error) {
        logger.error(error.message);
    }
}

const deleteUser = async (req, res) => {
    const { userId } = req.params
    // const deleteUser=await userModel.findByIdAndDelete(userId)
    // console.log(deleteUser);

    try {
        const user = await userModel.findOne({ _id: userId })
        if (!user) {
            res.status(200).json({ "data": `id : ${user._id} is not present...!!!` })
            return
        }
        const deletedUser = await userModel.deleteOne({ _id: userId })
        if (deletedUser.acknowledged) {
            res.status(200).json({ "data": `id : ${userId} got deleted...!!!` })
            return
        }
        res.status(400).json({ "data": `id : ${userId} has same issue...!!!` })
        throw new Error(`id : ${userId} has same issue...!!!`)
    } catch (error) {
        logger.error(error.message);
    }
}

const forgetPassword = async (req, res) => {
    const { email, password:newPassword, otp } = req.body
    console.log(email,newPassword,otp);
    try {
        const otpRecord = await OtpModel.findOne({ email, otp });
        if (!otpRecord || otpRecord.expiresAt < Date.now()) {
            return res.status(400).json({ data: 'Invalid or expired OTP' });
        }

        const bcrypt_password = await bcrypt.hash(newPassword, SALT_ROUND)

        const userDoc = await userModel.updateOne({ email }, { password:bcrypt_password })
        console.log(userDoc);

        if (userDoc.acknowledged) {
            res.status(200).json({ "data": `id : ${email} got updated...!!!` })
        } else {
            res.status(400).json({ "data": `id : ${email} has same issue...!!!` })
            throw new Error(`id : ${email} has same issue...!!!`)
        }
    } catch (error) {
        logger.error(error.message);
    }
}

module.exports = {
    login,
    updateUser,
    deleteUser,
    forgetPassword
}