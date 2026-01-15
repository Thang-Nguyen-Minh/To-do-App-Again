import React from "react";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Card} from "@/components/ui/card.jsx";
import {Plus} from "lucide-react";
export const AddTask = () => {
    return (
        //Khối bọc ngoài màu trắng, có đổ bóng, có bo góc bên ngoài
        <Card className="bg-gradient-card p-6 shadow-md rounded-2xl border-0">
            <div className="flex flex-col gap-6 sm:flex-row">
                <Input
                    type="text"
                    placeholder="Add a task"
                    className="h-12 text-base bg-slate-150 sm:flex-1 border-border/50 focus:boder-priamry/50 focus:ring-priamry/20"
                />
                <Button
                    variant="gradient"
                    size="xl"
                    className="px-6"
                >
                <Plus className="size-5"/>
                Add Task
                </Button>
            </div>
        </Card>
    )
}