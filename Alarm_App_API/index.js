const express = require('express')
const mongoose = require("mongoose");
require('dotenv').config()

const bodyParser = require("body-parser");
const morgan = require("morgan");
const schema = require('./models/video');


const app = express()
app.use(morgan('dev'));
app.use(bodyParser.json());




const dbURI = process.env.DB_URL
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => { console.log("Connected to Db"); })
    .catch((err) => { console.log(err); });



app.post('/api/addVideo', (req, res) => {
    const newVideo = new schema.Video(req.body)
    newVideo.save()
        .then(video => res.status(200).send(video))
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        });
})


app.post('/api/getVideos', (req, res) => {
    schema.Video.find()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        });
})

app.post('/api/getVideo/:id', (req, res) => {
    schema.Video.findOne({ id: req.params.id })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        });
})

app.post('/api/deleteVideos', (req, res) => {
    schema.Video.deleteMany()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        });
})

const port = process.env.PORT

app.listen(port, () => {
    console.log("Listening on port: " + port)
})