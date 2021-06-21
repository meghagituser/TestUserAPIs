const express = require("express")
const router = express.Router()
const fs = require("fs");
const login = require('./login')
const authenticate = require('./authentication').tokenAuthentication
const mongoose = require('mongoose')

const Users = require('./model/userModel')

/*----------Mongo db Connection---------------*/
mongoose.connect('mongodb://localhost:27017/Test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(`Mongo db connection error`)
    } else {
        console.log('Mongo db connected successfully')
    }
})

/*---------- login Api--------------------*/
router.post('/login', require('./login').login)


/*----------To get all users data-----------------*/
router.get('/users', authenticate, (req, res) => {
    console.log(`data` )
    Users.find()
        .exec()
        .then(data => {
            console.log(data)
            res.status(200).send(data)
        }).catch((err) => {
            res.status(500).send(err)
            console.log(err)
        });

    // fs.readFile("./userFile.json", (err, data) => {
    //     res.send(JSON.parse(data))
    // })
})

/*----------To create new user-----------------*/
router.post('/users', authenticate, (req, res) => {
    console.log(`data`, req.body)
    const user = new Users(
        req.body
    )
    user.save()
        .then(data => {
            console.log(data)
            res.status(200).send(data)
        }).catch((err) => {
            res.status(500).send(err)
            console.log(err)
        });


    // fs.readFile("./userFile.json", "utf8", (err, data) => {
    //     let dt = JSON.parse(data)
    //     dt.push(req.body);
    //     // console.log(`data  ${req.body}`)
    //     res.send(dt);
    // })


})

/*----------To get specific user data-----------------*/
router.get('/users/:id', authenticate, (req, res) => {
    const _id = req.params.id
    Users.findById(_id)
        .exec()
        .then(data => {
            if (data) {
                console.log(data)
                res.status(200).send(data)
            } else {
                res.status(404).send('No data found')
            }
        }).catch((err) => {
            res.status(500).send(err)
        });

    // fs.readFile("./userFile.json", "utf8", (err, data) => {

    //     let dt = JSON.parse(data).find((e) => {
    //         return e.id == req.params.id
    //     })
    //     res.send(dt)
    // })

})

/*----------To update specific user-----------------*/
router.put('/users/:id', authenticate, (req, res) => {
    const reqBody = req.body;
    const _id = req.params.id

    Users.updateOne({
            _id
        }, {
            $set: {
                userId: reqBody.userId,
                name: reqBody.name,
                address: reqBody.address,
                dob: reqBody.dob,
                state: reqBody.state
            }
        })
        .exec()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err))
    // fs.readFile("./userFile.json", "utf8", (err, data) => {
    //     let dt = JSON.parse(data)

    //     for (let a of dt) {
    //         if (a.id == req.params.id) {
    //             a.name = "Pradeep";
    //         }
    //     }
    //     res.send(dt);
    // })
})

/*----------To delete specific user-----------------*/
router.delete('/users/:id', authenticate, (req, res) => {
    const _id = req.params.id

    Users.deleteOne({
            _id
        })
        .exec()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err))

    // fs.readFile("./userFile.json", "utf8", (err, data) => {
    //     let dt = JSON.parse(data)

    //     for (let i = 0; i < dt.length; i++) {
    //         if (dt[i].id == req.params.id) {
    //             delete dt[i];
    //         }
    //     }
    //     res.send(dt);
    // })
})
module.exports = router