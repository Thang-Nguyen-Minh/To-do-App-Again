import React, {useState} from "react";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Card} from "@/components/ui/card.jsx";
import {Plus} from "lucide-react";
import {toast} from "sonner";
import {api} from "@/lib/axios.js";
export const AddTask = ({handleNewTaskAdded}) => {
    const [text, setText] = useState("");

    const addTask = async () => {
        if (text.trim()){
            try{
                await api.post("/tasks", {
                    title: text,
                })
                toast.success(`Task ${text} added successfully`);
                handleNewTaskAdded();
            }
            catch(e){
                console.error("AddTask failed with error",e);
                toast.error(`Cannot add task ${text}`,err.message);
            }
            setText("");
        }
        else{
            toast.error("You need to add task");
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    }

    return (
        //Khối bọc ngoài màu trắng, có đổ bóng, có bo góc bên ngoài
        <Card className="bg-gradient-card p-6 shadow-md rounded-2xl border-0">
            <div className="flex flex-col gap-6 sm:flex-row">
                <Input
                    type="text"
                    placeholder="Add a task"
                    className="h-12 text-base bg-slate-150 sm:flex-1 border-border/50 focus:boder-priamry/50 focus:ring-priamry/20"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <Button
                    variant="gradient"
                    size="xl"
                    className="px-6"
                    disabled={!text.trim()}
                    onClick={addTask}
                >
                <Plus className="size-5"/>
                Add Task
                </Button>
            </div>
        </Card>
    )
}