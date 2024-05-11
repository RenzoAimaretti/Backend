import  express  from "express";
import { userRouter } from "./user/users.routes.js";

   
const app=express()
app.use(express.json())

app.use('/api/users', userRouter)


app.listen(3000,()=>{
    console.log('Server is running on port 3000 http://localhost:3000/')
})



app.use((_,res)=>{
    res.status(404).send('Resource Not Found')
})

