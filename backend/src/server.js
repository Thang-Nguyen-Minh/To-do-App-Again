import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import taskRoutes from './routes/tasksRouters.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;
app.use(express.json());//chuyển json sang object cho dễ xử lý
app.use("/api/tasks", taskRoutes);

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`);
    })
});


