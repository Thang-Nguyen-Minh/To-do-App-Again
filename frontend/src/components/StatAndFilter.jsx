import React from "react";
import {FilterType} from "@/lib/data.js";
import {Badge} from "@/components/ui/badge.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Filter} from "lucide-react";

export const StatAndFilter = ({completedTasksCount=0, activeTasksCount=0, filter='all', setFilter}) => {
    return (
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            {/*Phần thống kê*/}
            <div className="flex gap-3">
                <Badge
                    variant="secondary"
                    className="bg-white/50 text-accent-foreground border-info/20"
                >
                    {/*truyền filter.active vào nghĩa là truyền chữ "đang làm" vào*/}
                    {activeTasksCount} {FilterType.active}
                </Badge>
                <Badge
                    variant="secondary"
                    className="bg-white/50 text-success border-success/20"
                >
                    {completedTasksCount} {FilterType.completed}
                </Badge>
            </div>
            {/*Phần lọc*/}
            <div className="flex flex-col gap-2 sm:flex-row">
                {/*Lặp qua các trạng thái và trả về, đoạn này đang lú*/}
                {
                    Object.keys(FilterType).map(type =>{
                        return (
                            <Button
                                key={type}
                                variant={filter===type ? "gradient" : "ghost"}
                                size="sm"
                                className="capitalize"
                                onClick={() => setFilter(type)}
                            >
                                <Filter className="size-4"/>
                                {FilterType[type]}
                            </Button>
                        )
                    })
                }
            </div>
        </div>
    )
}