const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;


const videoSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    path: {
        type: String,
        required: true
    }
});

const Video = Model("Video", videoSchema);
module.exports = { Video };