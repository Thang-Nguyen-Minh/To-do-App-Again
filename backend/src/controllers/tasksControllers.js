import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
    try{
        const getTask=await Task.find().sort({createdAt: -1});
        res.status(200).json(getTask);
    }
    catch(err){
        console.error("Lỗi khi gọi getAllTasks",err);
        res.status(500).send({
            message: "Lỗi hệ thống"
        });
    }
}

export const createTask = async (req, res) => {
    try{
        //Lấy ra tiêu đề
        const {title} = req.body;
        const task = new Task({title});
        const newTask=await task.save();
        res.status(200).json(newTask);
    }
    catch(err){
        console.error("Lỗi khi gọi createTask",err);
        res.status(500).send({
            message: "Lỗi hệ thống"
        });
    }
}

export const updateTask = async (req, res) => {
    try{
        //Lấy ra các trường có thể thay đổi
        const {title,status,completeAt} = req.body;
        const updateTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,status,completeAt
            },
            {
                new: true,
            }
        )
        if(!updateTask){
            res.status(404).send({
                message: "Task not found"
            })
        }
        res.status(201).json(updateTask);
    }
    catch(err){
        console.error("Lỗi khi gọi updateTask",err);
        res.status(500).send({
            message: "Lỗi hệ thống"
        });
    }
}

export const deleteTask = async (req, res) => {
    try{
        const id = req.params.id;
        const deleteTask=await Task.findByIdAndDelete(id);
        if(!deleteTask){
            res.status(404).send({
                message: "Task not found"
            })
        }
        res.status(201).json(deleteTask);
    }
    catch(err){
        console.error("Lỗi khi gọi deleteTask",err);
        res.status(500).send({
            message: "Lỗi hệ thống"
        });
    }
}