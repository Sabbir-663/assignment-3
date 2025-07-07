
import cors from "cors";
import express, { Application, NextFunction, Request, Response }  from 'express'
import { booksRouter } from './app/controllers/book.controller';
import { borrowsRouter } from './app/controllers/borrow.controller';
const app:Application = express()
app.use(express.json())

// const router = express.Router();
app.use(cors({
  origin: ['http://localhost:5173','https://assignment-4-ruby-gamma.vercel.app'],  // allow frontend dev server
  credentials: true               // optional, only needed if you're using cookies or headers like Authorization
}));
app.use('/api',booksRouter)
app.use('/api',borrowsRouter)

app.get('/', (req:Request, res:Response,next:NextFunction) => {
  res.send('Hello World!')
})


export default app