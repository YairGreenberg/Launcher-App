import express from 'express';
import cors from 'cors';
import routerAuth from './routes/auth.js';
import router from './routes/launchers.js';




const PORT = 5011
const app = express();
app.use(cors())
app.use(express.json())

app.use('/api/auth',routerAuth)
app.use('/api',router)




app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})