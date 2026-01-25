import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import taskRoutes from './routes/tasksRouters.js';
import cors from 'cors';
import path from 'path';
const app = express();
app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 8080;
const __dirname = path.resolve();

app.use(express.json());//chuyển json sang object cho dễ xử lý

app.use("/api/tasks", taskRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    })
}
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`);
    })
});


