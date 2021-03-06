const {Router} = require('express');
const router = Router();
const fs = require('fs-extra');
const path = require('path');

const Book = require('../models/Books');

router.get('/', async (req, res) =>{
    const books = await Book.find();
    res.json(books);
});


router.post('/', async (req, res) =>{
    const {title, author, link} = req.body;
    const imagePath = '/uploads/' + req.file.filename;
    const newBook = new Book({title, author, link, imagePath});
    await newBook.save();
    res.json({message: 'Book Save'});
});


router.delete('/:id', async (req, res) =>{
    const book = await Book.findByIdAndDelete(req.params.id);
    fs.unlink(path.resolve('./backend/public' + book.imagePath));
    res.json({message: 'Book Deleting'});
})
module.exports = router;