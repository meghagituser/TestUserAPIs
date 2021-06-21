const express = require("express")
const app = express();
const bodyParser = require("body-parser")
require('dotenv').config()


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`app listing at port ${port}`)
})


app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());



// app.get('/users', (req, res) => {
//     console.log(`data `)
//     fs.readFile("./userFile.json", (err, data) => {
//         //console.log(`data  ${data}`)
//         res.send(data)
//     })
//     //res.send(200)
// })

//-----------CORS--------------//
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, UPDATE, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next();
})

app.use('/apis', require('./routerAPIs'))