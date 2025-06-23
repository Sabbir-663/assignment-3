import express, { Request, Response } from 'express'
import { z } from 'zod'
import { borrowBooks } from '../model/borrow.model';
import { Types } from 'mongoose';
import { books } from '../model/book.model';


export const borrowsRouter = express.Router();

//zod validation 
const borrowZodValidationSchema = z.object({
 book:z.string(),
 quantity:z.number().int().min(1,{message:"Quantity must be at least 1"}),
 date:z.coerce.date()

})

//create borrow book
borrowsRouter.post('/borrow',async(req:Request,res:Response)=>{
  try{
    // const body = await borrowZodValidationSchema.parseAsync(req.body)
    const body = req.body
    const bookid = body.book;
  

   //find the book
    const book = await books.findById(bookid)
    console.log(book)
      if (!book) {
     res.status(404).json({ success: false, message: 'The Book is not found' });
     return
    }
    if(book?.copies<body.quantity||!book?.available){
   res.status(400).json({
        success: false,
        message: 'Book is not available',
      });
      return
    }
 
    //deduct the request quantity from books copies
    const copyLeft = book.copies-body.quantity;

  await books.findByIdAndUpdate(bookid,{$set:{
    copies:copyLeft
  }});

const borrow = await borrowBooks.create(body);
 res.status(201).json({
  success:true,
  message : "Book borrowed successfully",
  data:borrow
})



res.status(201).json({
  success:true,
  message : "Book borrowed successfully",
  data :book
})
  }catch(error:any){
  res.status(400).json({
  success:false,
  message : error.message,
 error
})
  }
})

//get borrow books

borrowsRouter.get('/borrow',async(req:Request,res:Response)=>{
  const borrowbooks= await borrowBooks.aggregate([
    {
      $group:{
        _id:"$book",
        totalQuantity:{$sum:"$quantity"}
      }
    },
    {
      $lookup:{
from:"books",
localField:"_id",
foreignField:"_id",
as:"All Books"
      }
    },
    {
      $unwind:"$All Books"
    },{
    $project:{
      _id: 0,
      book: {
        title: "$All Books.title",
        isbn: "$All Books.isbn"
      },
      totalQuantity: 1
    }
    }
  ])
  console.log(borrowBooks)
    res.status(201).json({
  success:true,
  message : "Borrowed books summary retrieved successfully",
  data : borrowbooks
})
})


