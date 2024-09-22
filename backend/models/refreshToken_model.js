const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true },
    refreshToken: { type: String, required: true }
});

const refreshTokenModel = mongoose.model('refresh_token', refreshTokenSchema);

module.exports=refreshTokenModel