import express from 'express';
import data from './data/data.js';
import books from './routes/books.js';
import { log } from 'console';
const app = express();
app.use(express.json());

const Port = 3000;

app.get('/books', (req, res) => {
    res.status(200).send(data);
});

app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = data.find(book => book.id === id);
    res.status(200).send(book);
});

app.post('/books', (req: books.Request, res: express.Response) => {
    if (!req.body.id || !req.body.title) {
        res.status(400).send({ message: 'Bad request and information is required' });
        return;
    }
    else {
        const book: books.item = {
            id: req.body.id,
            title: req.body.title,
            author: req.body.author,
            publicationYear: req.body.publicationYear
        }
        data.unshift(book);
        res.status(201).send("Book created successfully");
    }
});

app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const updatedBook = req.body;

    const bookIndex = data.findIndex((book) => book.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }
    data[bookIndex] = { ...data[bookIndex], ...updatedBook };

    res.json({ message: 'Book updated successfully', book: data[bookIndex] });
});


app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    if (bookId < 1 || bookId > 40) {
        return res.status(404).json({ message: 'There is no book with this Id ' });
    }
    const bookIndex = data.findIndex(book => book.id === bookId);
    const deleteBook = data.splice(bookIndex, 1);
    res.status(200).json({ message: 'Book deleted successfully', book: deleteBook });
});

app.get('/booksN', (req, res) => {
 
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

app.get('/booksY', (req, res) => {
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






app.get('/booksPG', (req: books.Request, res) => {
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



app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});