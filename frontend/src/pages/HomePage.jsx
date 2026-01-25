import React, {useEffect, useState} from 'react';
import {Header} from "@/components/Header.jsx";
import {AddTask} from "@/components/AddTask.jsx";
import {StatAndFilter} from "@/components/StatAndFilter.jsx";
import {TaskList} from "@/components/TaskList.jsx";
import {Pagi} from "@/components/TaskPagination.jsx"
import {DateTimeFilter} from "@/components/DateTimeFilter.jsx";
import {Footer} from "@/components/Footer.jsx";
import {toast} from "sonner";
import {api} from "@/lib/axios.js";
import {visibleTaskLimit} from "@/lib/data.js";

export const HomePage = () => {
    const [taskBuffer,setTaskBuffer] = useState([]);
    //Hiển thị task đang làm và đã hoàn thành ở bộ lọc
    const [activeTaskCount,setActiveTaskCount] = useState(0);
    const [completeTaskCount,setCompleteTaskCount] = useState(0);
    const [filter, setFilter] = useState("all");
    //Quản lý giá trị mà người dùng chọn trong combobox
    const [dateQuery, setDateQuery] = useState("today");
    //Xem đang ở trang số mấy
    const [page, setPage] = useState(1);

    useEffect(()=>{
        fetchTasks();
    },[dateQuery])

    useEffect(()=>{
        setPage(1)
    },[filter,dateQuery])

    const fetchTasks = async () => {
        try{
            const res = await api.get(`/tasks?filter=${dateQuery}`);
            setTaskBuffer(res.data.tasks);
            setActiveTaskCount(res.data.activeCount);
            setCompleteTaskCount(res.data.completeCount);
        }
        catch(err){
            console.error("Cannot load tasks",err);
            toast.error("Load tasks unsuccessful",err.message);
        }
    }

    const handleTaskChanged = () =>{
        fetchTasks();
    }

    const handleNext = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    }

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    }

    const handlePageChange = (newPage) => {
        setPage(newPage);
    }

    const filteredTask = taskBuffer.filter((task) => {
        if (filter === "active") {
            return task.status==='active'
        }
        else if (filter === "completed") {
            return task.status==='complete'
        }
        else return true;
    })

    const visibleTasks = filteredTask.slice(
        (page-1)*visibleTaskLimit, page*visibleTaskLimit
    )
    if (visibleTasks.length===0) {
        handlePrev();
    }
    const totalPages = Math.ceil(filteredTask.length/visibleTaskLimit);

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
                    <AddTask handleNewTaskAdded={handleTaskChanged}/>
                    {/*Lọc*/}
                    <StatAndFilter
                        filter={filter}
                        setFilter={setFilter}
                        activeTasksCount={activeTaskCount}
                        completedTasksCount={completeTaskCount}
                    />
                    {/*Hiển thị task*/}
                    <TaskList Tasks={visibleTasks} trangthaiHienThi={filter}
                              handleTaskChanged={handleTaskChanged}
                    />
                    {/*Phân trang*/}
                    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                        <Pagi
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            handlePageChange={handlePageChange}
                            page={page}
                            totalPages={totalPages}
                        />
                        <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery}/>
                    </div>
                    {/*Chân trang*/}
                    <Footer
                        activeTasksCount={activeTaskCount}
                        completedTasksCount={completeTaskCount}
                    />
                </div>
            </div>
        </div>
    )
}