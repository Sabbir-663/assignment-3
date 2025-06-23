import express, { Request, Response } from 'express'
import { books } from '../model/book.model'
import { z } from 'zod'

export const booksRouter = express.Router()

//zod validation 
const bookZodValidationSchema = z.object({
  title:z.string(),
  author : z.string(),
    genre: z.enum(['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']),
    isbn:z.string(),
    description:z.string().optional(),
    copies:z.number().int().min(0,{message:"Copies must be a positive number"}),
    available :z.boolean().optional().default(true)
})

//create book
booksRouter.post('/books',async(req:Request,res:Response)=>{
  try{
    const body = await bookZodValidationSchema.parseAsync(req.body)
const book = await books.create(body);
res.status(201).json({
  success:true,
  message : "Book created successfully",
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

//get all books

  booksRouter.get('/books',async(req:Request,res:Response)=>{
    const {genre,sort='asc',limit='10'}=req.query
    const query:any = {}
    if(genre){
      query.genre=genre
    }
    const book = await books.find(query).sort({"genre":"asc"}).limit(parseInt(limit as string,10));
    res.status(201).json({
    success:true,
    message : "Books retrieved successfully",
    data : book
  })
  })

//get sigle book
booksRouter.get('/books/:bookId',async(req:Request,res:Response)=>{
  const id = req.params.bookId;
  const book = await books.findById(id);

  res.status(201).json({
  success:true,
  message : "Book retrieved successfully",
  data:book
})
})

//delete book
booksRouter.delete('/books/:bookId',async(req:Request,res:Response)=>{
  const id = req.params.bookId;
 await books.findByIdAndDelete(id);

  res.status(201).json({
  success:true,
  message : "Book deleted successfull",
  data:null
})
})

//update book

booksRouter.patch('/books/:bookId',async(req:Request,res:Response)=>{
  const id = req.params.bookId;
  const body = req.body;

 const book = await books.findByIdAndUpdate(id,body,{new:true});

  res.status(201).json({
  success:true,
  message : "Book updated successfully",
  data:book
})
})


