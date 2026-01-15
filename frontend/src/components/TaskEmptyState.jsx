import React from "react";
import {Card} from "@/components/ui/card.jsx";
import {Circle} from "lucide-react";
//Tư duy là truyền filter lọc trạng thái xong hi ển thị theo trạng thái
//Má thảo nào ngồi code c ứ bị lú, hóa ra là sai ngay từ đầu
//Trong model có 1 hàm status : active và complete thì làm theo trạng thái đó
//2 cách code : 1 là dùng toán tử 3 ngôi lồng nhau, 2 là dùng ánh xạ từ Object
export const TaskEmptyState = ({filter}) => {
    return (
        <Card className="bg-white text-center border-0 rounded-2xl shadow-sm">
            <div className="space-y-3">
            <Circle className="mx-auto size-12 text-muted-foreground" />
                <h3 className="font-medium text-foreground">
                    {
                        filter==='active' ? 'Không có nhiệm vụ nào' :
                        filter=='completed' ? 'Chưa có nhiệm vụ nào hoàn thành'
                        : 'Chưa có nhiệm vụ'
                    }
                </h3>
                <p className="text-sm text-muted-foreground">
                    {filter==='all' ? "Thêm nhiệm vụ đầu tiên để bắt đầu"
                    : `Chuyển sang tất cả để thấy nhiệm vụ 
                    ${filter==='active' ? "đang làm" : "đã hoàn thành"}`
                    }
                </p>
            </div>
        </Card>
    )
}