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
exports.borrowsRouter = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const borrow_model_1 = require("../model/borrow.model");
const book_model_1 = require("../model/book.model");
exports.borrowsRouter = express_1.default.Router();
//zod validation 
const borrowZodValidationSchema = zod_1.z.object({
    book: zod_1.z.string(),
    quantity: zod_1.z.number().int().min(1, { message: "Quantity must be at least 1" }),
    date: zod_1.z.coerce.date()
});
//create borrow book
exports.borrowsRouter.post('/borrow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const body = await borrowZodValidationSchema.parseAsync(req.body)
        const body = req.body;
        const bookid = body.book;
        //find the book
        const book = yield book_model_1.books.findById(bookid);
        console.log(book);
        if (!book) {
            res.status(404).json({ success: false, message: 'The Book is not found' });
            return;
        }
        if ((book === null || book === void 0 ? void 0 : book.copies) < body.quantity || !(book === null || book === void 0 ? void 0 : book.available)) {
            res.status(400).json({
                success: false,
                message: 'Book is not available',
            });
            return;
        }
        //deduct the request quantity from books copies
        const copyLeft = book.copies - body.quantity;
        yield book_model_1.books.findByIdAndUpdate(bookid, { $set: {
                copies: copyLeft
            } });
        const borrow = yield borrow_model_1.borrowBooks.create(body);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow
        });
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
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
//get borrow books
exports.borrowsRouter.get('/borrow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const borrowbooks = yield borrow_model_1.borrowBooks.aggregate([
        {
            $group: {
                _id: "$book",
                totalQuantity: { $sum: "$quantity" }
            }
        },
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "_id",
                as: "All Books"
            }
        },
        {
            $unwind: "$All Books"
        }, {
            $project: {
                _id: 0,
                book: {
                    title: "$All Books.title",
                    isbn: "$All Books.isbn"
                },
                totalQuantity: 1
            }
        }
    ]);
    console.log(borrow_model_1.borrowBooks);
    res.status(201).json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: borrowbooks
    });
}));
