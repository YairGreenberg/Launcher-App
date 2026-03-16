import express from 'express';
import cors from 'cors';
import routerAuth from './routes/auth.js';




const PORT = 5011
const app = express();
app.use(cors())
app.use(express.json())

app.use('/',routerAuth)




app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})