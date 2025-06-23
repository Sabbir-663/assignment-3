import { model, Schema, Types } from "mongoose";
import { IBorrow } from "../interfaces/book.interface";


export const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Books' },
    quantity: { type: Number, required: true, min: [1, 'Quantity must be at least 1'] },
    dueDate: { type: Date, required: true }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export const borrowBooks = model("BorrowBooks",borrowSchema)
