const mongoose = require('mongoose')
const { Schema } = mongoose;

// this is note db schema
const NoteSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const Note = mongoose.model('note', NoteSchema);
Note.createIndexes();
module.exports = Note;