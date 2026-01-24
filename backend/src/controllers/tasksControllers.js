import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
    try{
        const getTask=await Task.find({}).sort({createdAt:-1});
        //Aggregate pipeline để chạy song song cả loadTasks lẫn lọc
        //count đầu là đếm, count 2 là trả về 1 mảng có key là count
        const result = await Task.aggregate([{
            $facet : {
                tasks : [{$sort: {createdAt:-1}}],
                activeCount : [{$match : {status : "active"}},{$count : "count"}],
                completeCount : [{$match : {status : "complete"}},{$count : "count"}],
            }
        }])
        const tasks=result[0].tasks;
        //?. là thg ở trước tồn tại thì thực hiện thg ở sau
        //Nếu activeCount[0] tồn tại, nó lấy giá trị .count
        //Nếu activeCount[0] là undefined, nó sẽ trả về undefined ngay lập tức thay vì báo lỗi, lấy giá trị là 0
        const activeCount = result[0].activeCount[0]?.count || 0;
        const completeCount = result[0].completeCount[0]?.count || 0;
        res.status(200).json({tasks,activeCount,completeCount});
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