const express = require('express');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note');

//ROUTE 1- Get all the notes using: GET "/api/v1/note/fetchallnotes". *Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        return res.status(400).json({error: "Internal server error"})
    }
});

//ROUTE 2- Add a note Note using: POST "/api/v1/note/addnote". *Login required
router.post('/addnote', fetchuser, [
    body('title', 'Title must be atleast 3 and max 34 characters').isLength({ min: 3, max: 34 }),
    body('description', 'Description must be atleast 5 and max 175 characters').isLength({ min: 5, max: 175 }),
    body('tag', 'Tag must be atleast 5 and max 20 characters').isLength({ min: 3, max: 20 }),
], async (req, res) => {

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() });
    }

    try {

    //creating a note associting with a user
    const note = new Note({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        user: req.user.id
    })
    const saveNote = await note.save();
    res.json(note);

    } catch (error) {
        return res.status(400).json({error: "Internal server error."})
    }
});

//ROUTE 3- Update a note Note using: PUT "/api/v1/note/updatenote/:id". *Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {
     //creating new note for updating
     const newNote = {}
     if(req.body.title){newNote.title = req.body.title};
     if(req.body.description){newNote.description = req.body.description};
     if(req.body.tag){newNote.tag = req.body.tag};

    //fetching note by param
    let note = await Note.findById(req.params.id);

    //if note not exists
    if(!note){
        return res.status(404).send("Not Found")
    }
    //verifying user authentication
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
    res.json(note);

    } catch (error) {
        return res.status(400).json({error: "Internal server error."})
    }
});

//ROUTE 4- Delete a note Note using: DELETE "/api/v1/note/deletenote/:id". *Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {

    //fetching note by param
    let note = await Note.findById(req.params.id);

    //if note not exists
    if(!note){
        return res.status(404).send("Not Found")
    }
    //verifying user authentication
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note has been deleted"});

    } catch (error) {
        return res.status(400).json({error: "Internal server error."})
    }
});

module.exports = router