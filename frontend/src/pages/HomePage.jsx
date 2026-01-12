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
    )
}