import React from 'react';

export const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <img src="404_NotFound.png" alt="Not Found" className="max-w-full mb-6 w-96" />
            <p className="text-xl font-semibold text-gray-900">
                Bạn đang đi vào vùng cấm địa 🚫
            </p>
            <a href="/" className="inline-block bg-primary text-white font-medium rounded-2xl px-6 py-3 mt-6 shadow-md transition hover:bg-primary-dark">
                Quay về trang chủ
            </a>
        </div>
    )
}