"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.books = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
        type: String,
        required: true,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: [0, "Copies number cannot be negative"] },
    available: { type: Boolean, default: true }
}, { versionKey: false, timestamps: true });
exports.books = (0, mongoose_1.model)("Books", bookSchema);
