"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_1 = __importDefault(require("../data/data"));
const Router = express_1.default.Router();
Router.get('/all', (req, res) => {
    res.status(200).send(data_1.default);
});
Router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = data_1.default.find(book => book.id === id);
    res.status(200).send(book);
});
Router.post('/book', (req, res) => {
    if (!req.body.id || !req.body.title) {
        res.status(400).send({ message: 'Bad request and information is required' });
        return;
    }
    else {
        const book = {
            id: req.body.id,
            title: req.body.title,
            author: req.body.author,
            publicationYear: req.body.publicationYear
        };
        data_1.default.unshift(book);
        res.status(201).send("Book created successfully");
    }
});
Router.put('/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const updatedBook = req.body;
    const bookIndex = data_1.default.findIndex((book) => book.id === bookId);
    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }
    data_1.default[bookIndex] = { ...data_1.default[bookIndex], ...updatedBook };
    res.json({ message: 'Book updated successfully', book: data_1.default[bookIndex] });
});
Router.delete('/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    if (bookId < 1 || bookId > 40) {
        return res.status(404).json({ message: 'There is no book with this Id ' });
    }
    const bookIndex = data_1.default.findIndex(book => book.id === bookId);
    const deleteBook = data_1.default.splice(bookIndex, 1);
    res.status(200).json({ message: 'Book deleted successfully', book: deleteBook });
});
Router.get('/byName', (req, res) => {
    const { name } = req.query;
    if (!name || name.toString() === '') {
        return res.status(400).json({ message: 'Book name parameter is required' });
    }
    const matchedBooks = data_1.default.filter((book) => book.title.toLowerCase().includes(String(name).toLocaleLowerCase()));
    if (matchedBooks.length === 0) {
        return res.status(404).json({ message: 'No books found with the given name' });
    }
    res.json(matchedBooks);
});
Router.get('/byYear', (req, res) => {
    const { year } = req.query;
    if (!year) {
        return res.status(400).json({ message: 'Invalid publishing year' });
    }
    const matchedBooks = data_1.default.filter((book) => book.publicationYear === Number(year));
    if (matchedBooks.length === 0) {
        return res.status(404).json({ message: 'No books found in the given publishing year' });
    }
    res.json(matchedBooks);
});
Router.get('/Pagination', (req, res) => {
    const page = parseInt(req.query.page || '1');
    const pageSize = parseInt(req.query.pageSize || '10');
    const filterdItems = data_1.default.slice((page - 1) * pageSize, page * pageSize);
    res.send({
        page,
        pageSize,
        total: data_1.default.length,
        filterdItems
    });
});
exports.default = Router;
