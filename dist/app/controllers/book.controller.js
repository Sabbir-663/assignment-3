"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../model/book.model");
const zod_1 = require("zod");
exports.booksRouter = express_1.default.Router();
//zod validation 
const bookZodValidationSchema = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    genre: zod_1.z.enum(['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']),
    isbn: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    copies: zod_1.z.number().int().min(0, { message: "Copies must be a positive number" }),
    available: zod_1.z.boolean().optional().default(true)
});
//create book
exports.booksRouter.post('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield bookZodValidationSchema.parseAsync(req.body);
        const book = yield book_model_1.books.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error
        });
    }
}));
//get all books
exports.booksRouter.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { genre, sort = 'asc', limit = '10' } = req.query;
    const query = {};
    if (genre) {
        query.genre = genre;
    }
    const book = yield book_model_1.books.find(query).sort({ "genre": "asc" }).limit(parseInt(limit, 10));
    res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        data: book
    });
}));
//get sigle book
exports.booksRouter.get('/books/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.bookId;
    const book = yield book_model_1.books.findById(id);
    res.status(201).json({
        success: true,
        message: "Book retrieved successfully",
        data: book
    });
}));
//delete book
exports.booksRouter.delete('/books/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.bookId;
    yield book_model_1.books.findByIdAndDelete(id);
    res.status(201).json({
        success: true,
        message: "Book deleted successfull",
        data: null
    });
}));
//update book
exports.booksRouter.patch('/books/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.bookId;
    const body = req.body;
    const book = yield book_model_1.books.findByIdAndUpdate(id, body, { new: true });
    res.status(201).json({
        success: true,
        message: "Book updated successfully",
        data: book
    });
}));
