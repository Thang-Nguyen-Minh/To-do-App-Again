import React from "react";
import {TaskEmptyState} from "@/components/TaskEmptyState.jsx";
import {TaskCard} from "@/components/TaskCard.jsx";

export const TaskList = () => {
    let trangthaiHienThi='all'
    const Tasks=[
        {
            id : '1',
            title : "Học code",
            status : "active",
            completedAt: null,
            createdAt: new Date(),
        },
        {
            id : '2',
            title : "Học tiếng anh",
            status : "complete",
            completedAt: new Date(),
            createdAt: new Date(),
        }
    ]
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