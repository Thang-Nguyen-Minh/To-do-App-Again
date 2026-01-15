import React from 'react';
import {Header} from "@/components/Header.jsx";
import {AddTask} from "@/components/AddTask.jsx";
import {StatAndFilter} from "@/components/StatAndFilter.jsx";
import {TaskList} from "@/components/TaskList.jsx";
import {Pagi} from "@/components/TaskPagination.jsx"
import {DateTimeFilter} from "@/components/DateTimeFilter.jsx";
import {Footer} from "@/components/Footer.jsx";

export const HomePage = () => {
    return (
        <div className="min-h-screen w-full bg-[#fefcff] relative">
            {/* Dreamy Sky Pink Glow */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
                }}
            />
            {/* Your Content/Components */}
            <div className="container pt-8 mx-auto relative z-10">
                <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
                    {/*Đầu trang*/}
                    <Header/>
                    {/*Thêm Task*/}
                    <AddTask/>
                    {/*Lọc*/}
                    <StatAndFilter/>
                    {/*Hiển thị task*/}
                    <TaskList/>
                    {/*Phân trang*/}
                    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                        <Pagi/>
                        <DateTimeFilter/>
                    </div>
                    {/*Chân trang*/}
                    <Footer/>
                </div>
            </div>
        </div>
    )
}