import React from "react";

export const Footer = ({completedTasksCount=0, activeTasksCount=0}) => {
    return (
        <>
            {completedTasksCount + activeTasksCount > 0 && (
            <div className="text-center text-muted-foreground">
                <p className="text-sm text-muted-foreground">
                    {
                        completedTasksCount > 0 && (
                            <span>
                                🎉 Tuyệt vời! Bạn đã hoàn thành {completedTasksCount} việc
                                {
                                    activeTasksCount > 0 && ` còn ${activeTasksCount} việc nữa thôi. Cố lên !`
                                }
                            </span>
                        )
                    }
                    {completedTasksCount === 0 && activeTasksCount > 0 && (
                        <span className="text-sm text-muted-foreground">
                            Hãy bắt đầu làm {activeTasksCount} nhiệm vụ nào !
                        </span>
                    )}
                </p>
            </div>
            )}
        </>
    )
}