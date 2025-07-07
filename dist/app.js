"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./app/controllers/book.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// const router = express.Router();
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://assignment-4-ruby-gamma.vercel.app'], // allow frontend dev server
    credentials: true // optional, only needed if you're using cookies or headers like Authorization
}));
app.use('/api', book_controller_1.booksRouter);
app.use('/api', borrow_controller_1.borrowsRouter);
app.get('/', (req, res, next) => {
    res.send('Hello World!');
});
exports.default = app;
