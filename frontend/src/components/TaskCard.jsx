import React ,{useState}from "react";
import {Card} from "@/components/ui/card.jsx";
import {Calendar, CheckCircle, Circle, SquarePen, Trash2} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import {cn} from "@/lib/utils.js";
import {Input} from "@/components/ui/input.jsx";
import {toast} from "sonner";
import {api} from "@/lib/axios.js";
//Tư duy "Nhị phân" (Chỉ cần kiểm tra 1 bên)
//Coi active là trạng thái mặc định, chỉ cần kiểm tra complete.
export const TaskCard = ({task,index,handleTaskChanged}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");

    const deleteTask = async (taskId) => {
        try{
            await api.delete(`tasks/${taskId}`);
            toast.success("Task has been deleted");
            handleTaskChanged();
        }
        catch(err){
            console.error("Delete Task unsuccessful",err);
            toast.error("Delete Task  unsuccessful",err.message);
        }
    }

    const updateTask = async () => {
        try{
            setIsEditing(false);
            await api.put(`tasks/${task._id}`,{
                title: updateTaskTitle,
            });
            toast.success(`Task has been changed to ${updateTaskTitle}`);
            handleTaskChanged();
        }
        catch(err){
            console.error("Update Task unsuccessful",err);
            toast.error("Update Task  unsuccessful",err.message);
        }
    }

    //Bật tắt trạng thái
    //Thì sẽ có logic nữa là khi nào task hoàn thành, má phải nghĩ chứ
    const toggleTaskCompleteButton = async () =>{
        try{
            if (task.status === "active"){
                await api.put(`/tasks/${task._id}`,{
                    status: "complete",
                    completedAt : new Date().toISOString(),
                })
                toast.success(`${task.title} has been completed`);
            }
            else{
                await api.put(`/tasks/${task._id}`,{
                    status: "active",
                    completedAt: null
                })
                toast.success(`${task.title} has changed to active`);
            }
            //Gọi hàm fetchTasks để giao diện thay đổi
            handleTaskChanged();
        }
        catch(err){
            console.error("Cannot update status task",err);
            toast.error("Cannot update status task",err.message);
        }
    }


    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            updateTask();
        }
    }

    return (
        <Card className={cn(
            "p-4 bg-gradient-card mb-4 border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200" +
            " animate-fade-in group",
            task.status === "complete" && "opacity-75",
        )}
              style={{animationDelay: `${index * 50}ms`}}
        >
            <div className="flex items-center justify-between gap-4">
            {/*Nút tròn*/}
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "flex-shrink-0 size-8 rounded-full transition-all duration-200",
                        task.status === "complete" ? "text-success hover:text-success/80"
                            : "text-muted-foreground hover:text-primary"
                    )}
                    onClick={toggleTaskCompleteButton}
                >
                    {task.status === "complete" ? <CheckCircle className="size-5"/> : <Circle className="size-5"/>}
                </Button>
                {/*Hiển thị hoặc chỉnh sửa tiêu đề*/}
                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <Input
                            placeholder='Cần phải làm gì'
                            className='flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20'
                            type='text'
                            value={updateTaskTitle}
                            onChange={(e)=>setUpdateTaskTitle(e.target.value)}
                            onKeyPress={handleKeyPress}
                            onBlur={() => {
                                setIsEditing(false);
                                setUpdateTaskTitle(task.title || "");
                            }}
                        />
                    ) : (
                        <p className={cn(
                            "text-base transition-all duration-200",
                            task.status === "complete" ? "line-through text-muted-foreground" : "text-foreground"
                        )}>
                            {task.title}</p>
                    )}
                    {/*ngày tạo và ngày hoàn thành : toLocalString()*/}
                    <div className="flex items-center gap-2 mt-1">
                        <Calendar className="size-3 text-muted-foreground"/>
                        <span className="text-xs text-muted-foreground">
                            {new Date(task.createdAt).toLocaleString()}
                        </span>
                        {task.completedAt && (
                            <>
                            <span className="text-xs text-muted-foreground">
                                -
                            </span>
                                <Calendar className="size-3 text-muted-foreground"/>
                                <span className="text-xs text-muted-foreground">
                                    {new Date(task.completedAt).toLocaleString()}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            {/*nút edit và delete*/}
                <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
                {/*    nút edit*/}
                    <Button variant="ghost" size="icon"
                            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
                            onClick={() => {
                                setIsEditing(true);
                                setUpdateTaskTitle(task.title || "");
                            } }>
                        <SquarePen className="size-4"/>
                    </Button>
                {/*    Nút xóa */}
                    <Button variant="ghost" size="icon"
                            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
                    onClick={()=>deleteTask(task._id)}
                    >
                        <Trash2 className="size-4"/>
                    </Button>
                </div>
            </div>
        </Card>
    )
}