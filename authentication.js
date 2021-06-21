const JWT = require('jsonwebtoken')
const fs = require("fs");

function generateToken(userId) {
    const payload = {
        userId
    }
    const privateKey = fs.readFileSync(`./config/private.key`, `utf8`)
    const accesstoken = JWT.sign(payload, privateKey, {
        expiresIn: "1h"
    })
    return accesstoken;
}

const tokenAuthentication = async (req, res, next) => {
    try {
        // if (req.headers.accesstoken) {
        //     const privateKey = fs.readFileSync(`./config/private.key`, `utf8`)
        //     const data = JWT.verify(req.headers.accesstoken, privateKey)
        //     //console.log('data', data)
           next()
        // } else {
        //     res.status(200).send('AuthToken Missing')
        // }
    } catch (err) {
        res.status(500).send(`Something went wrong: ${err.message}`)
    }
}
module.exports = {
    generateToken,
    tokenAuthentication
}