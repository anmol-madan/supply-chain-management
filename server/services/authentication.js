const JWT = require("jsonwebtoken");

const secret = "$uperm@an45";

function createTokenForUser(user){
    const payload = {
        fullName : user.fullName,
        _id : user._id,
        email : user.email
    };

    const token = JWT.sign(payload,secret);
    return token;
};

function verifyToken(token){
    const payload = JWT.verify(token,secret);
    return payload;
}

module.exports = {
    createTokenForUser,
    verifyToken
}