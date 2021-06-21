const auth = require('./authentication')

const login = async (req, res) => {
    reqBody = req.body;

    let logCred = {
        userId: process.env.LOGIN_USERID,
        passWord: process.env.LOGIN_PASSWORD
    }
    //console.log(`data `, reqBody)
    if (reqBody.userId && reqBody.password) {

        if (reqBody.userId == logCred.userId && reqBody.password === logCred.passWord) {
            const accessToken = auth.generateToken(reqBody.userId)
            const resObj = {
                userId: reqBody.userId,
                accessToken: accessToken
            }
            res.status(200).send(resObj)
        } else {
            res.status(200).send("Invalid Credentials")
        }
    } else {
        res.status(200).send("Please provide Credentials")

    }
}
module.exports.login = login