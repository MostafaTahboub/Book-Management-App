import express from 'express';
import book from '../types/books'
import data from '../data/data'

const Router=express.Router();

Router.get('/all', (req, res) => {
    res.status(200).send(data);
});


Router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = data.find(book => book.id === id);
    res.status(200).send(book);
});


Router.post('/book', (req: book.Request, res: express.Response) => {
    
    if (!req.body.id || !req.body.title) {
res.status(400).send({ message: 'Bad request and information is required' });
        return;
    }

    else {
        const book: book.item = {
            id: req.body.id,
            title: req.body.title,
            author: req.body.author,
            publicationYear: req.body.publicationYear
        }
        data.unshift(book);
        res.status(201).send("Book created successfully");
    }
});


Router.put('/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const updatedBook = req.body;

    const bookIndex = data.findIndex((book) => book.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }
    data[bookIndex] = { ...data[bookIndex], ...updatedBook };

    res.json({ message: 'Book updated successfully', book: data[bookIndex] });
});


Router.delete('/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    if (bookId < 1 || bookId > 40) {
        return res.status(404).json({ message: 'There is no book with this Id ' });
    }
    const bookIndex = data.findIndex(book => book.id === bookId);
    const deleteBook = data.splice(bookIndex, 1);
    res.status(200).json({ message: 'Book deleted successfully', book: deleteBook });
});


Router.get('/byName', (req, res) => {
 
  const {name} =req.query;
  
  
  if (!name || name.toString() === '') {
    return res.status(400).json({ message: 'Book name parameter is required' });
  }

  const matchedBooks = data.filter((book) =>
    book.title.toLowerCase().includes(String(name).toLocaleLowerCase())
  );

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
    
  
    const matchedBooks =data.filter((book) =>book.publicationYear===Number(year));
  
    if (matchedBooks.length === 0) {
      return res.status(404).json({ message: 'No books found in the given publishing year' });
    }
  
    res.json(matchedBooks);
  });


Router.get('/Pagination', (req: book.Request, res) => {
    const page = parseInt(req.query.page || '1');
    const pageSize = parseInt(req.query.pageSize || '10');
    const filterdItems = data.slice((page - 1) * pageSize, page * pageSize);
    res.send({
        page,
        pageSize,
        total: data.length,
        filterdItems
    });

});
export default Router;