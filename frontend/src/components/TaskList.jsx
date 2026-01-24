import React from "react";
import {TaskEmptyState} from "@/components/TaskEmptyState.jsx";
import {TaskCard} from "@/components/TaskCard.jsx";

export const TaskList = ({Tasks,trangthaiHienThi}) => {
    if (!Tasks || !Tasks.length) {
        return <TaskEmptyState filter={trangthaiHienThi}/>
    }
    return (
        <div className="space-y-3">
            {Tasks.map((task,index) => {
                return <TaskCard key={task._id ?? index} task={task} index={index}/>
            })}
        </div>
    )
}