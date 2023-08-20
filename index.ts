import express from 'express';
import booksRouter from './routes/book.router';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/books", booksRouter)

app.get('/get-ip', (req, res) => {
  const ip = req.socket.remoteAddress;
  res.json({ ip });
});

app.use((req, res) => {
    res.status(404).send("You requested something does not exist :(");
})


app.get('/',(req,res)=>{
  res.send('hello books');
})

app.get('/health',(req,res)=>{
res.status(200).send('OK');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

