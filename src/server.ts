
import mongoose from "mongoose";
import app from "./app";

const port = 5000
const database_url ="mongodb+srv://B5_assignment_3:1234@cluster0.ei8vvcb.mongodb.net/B5_assignment_3?retryWrites=true&w=majority&appName=Cluster0"

async function main() {
  try {
    await mongoose.connect(database_url as string)
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Example app listening on port ${port}`)
    })
  } catch (err) {
    console.log(err)
  }
}
main()