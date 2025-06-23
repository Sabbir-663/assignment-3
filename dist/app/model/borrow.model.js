"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBooks = exports.borrowSchema = void 0;
const mongoose_1 = require("mongoose");
exports.borrowSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Books' },
    quantity: { type: Number, required: true, min: [1, 'Quantity must be at least 1'] },
    dueDate: { type: Date, required: true }
}, {
    versionKey: false,
    timestamps: true
});
exports.borrowBooks = (0, mongoose_1.model)("BorrowBooks", exports.borrowSchema);
