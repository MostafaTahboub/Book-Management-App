"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_router_1 = __importDefault(require("./routes/book.router"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use("/books", book_router_1.default);
app.get('/get-ip', (req, res) => {
    const ip = req.socket.remoteAddress;
    res.json({ ip });
});
app.use((req, res) => {
    res.status(404).send("You requested something does not exist :(");
});
app.get('/', (req, res) => {
    res.send('hello books');
});
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
