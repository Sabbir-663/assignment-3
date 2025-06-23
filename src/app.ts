
import express, { Application, NextFunction, Request, Response }  from 'express'
import { booksRouter } from './app/controllers/book.controller';
import { borrowsRouter } from './app/controllers/borrow.controller';
const app:Application = express()
app.use(express.json())

// const router = express.Router();

app.use('/api',booksRouter)
app.use('/api',borrowsRouter)

app.get('/', (req:Request, res:Response,next:NextFunction) => {
  res.send('Hello World!')
})


export default app