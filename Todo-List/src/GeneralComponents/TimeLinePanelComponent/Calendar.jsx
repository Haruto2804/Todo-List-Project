import React, { useState } from "react";
import { LuCircleChevronRight, LuCircleChevronLeft } from "react-icons/lu";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // --- Logic Xử lý Ngày Tháng ---
  const renderDates = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Tính toán các mốc ngày tháng cần thiết
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    // Dữ liệu cần thiết
    const totalDays = lastDay.getDate(); // Sửa lỗi: Lấy tổng số ngày (28-31)
    const firstDayIndex = firstDay.getDay(); // Thứ của ngày 1 (0=CN, 1=T2,...)
    // Tiêu đề Tháng & Năm
    const monthYearString = currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric', });

    let datesArray = [];
    // Chuẩn bị chuỗi ngày hôm nay để so sánh (ví dụ: "11/21/2025")
    const todayString = new Date().toLocaleDateString();

    // 1. Các ngày của Tháng trước (Inactive)
    // firstDayIndex là số ngày của tháng trước cần hiển thị để lấp đầy hàng đầu
    for (let i = firstDayIndex; i > 0; i--) {
      // Logic: new Date(Năm, Tháng Hiện Tại, 0 - i + 1) để lùi ngày
      const prevDate = new Date(currentYear, currentMonth, 0 - i + 1);
      datesArray.push(
        <div key={`prev-${i}`} className="date inactive text-gray-400 p-2">
          {prevDate.getDate()} {/* SỬA LỖI: Dùng getDate() thay vì getDay() */}
        </div>
      );
    }

    // 2. Các ngày của Tháng hiện tại
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const dateString = date.toLocaleDateString(); // SỬA LỖI: Lấy ngày tháng hiện tại dưới dạng chuỗi
      const activeClass = dateString === todayString ? 'bg-blue-600 text-white font-bold' : '';

      datesArray.push(
        <div key={`current-${i}`} className={`date p-2 rounded-xl cursor-pointer hover:bg-gray-200 ${activeClass}`}>
          {i} {/* SỬA LỖI: Dùng i hoặc date.getDate() thay vì getDay() */}
        </div>
      );
    }

    // 3. Các ngày của Tháng sau (Inactive)
    // remainingSlots tính số ô còn thiếu
    const remainingSlots = 7 - datesArray.length % 7;
    const slotsNeeded = remainingSlots === 7 ? 0 : remainingSlots; // Nếu là 7, nghĩa là hàng đã đầy hoặc là hàng mới hoàn toàn, ta không cần thêm

    if (slotsNeeded > 0) {
      for (let i = 1; i <= slotsNeeded; i++) { // SỬA LỖI: Bắt đầu từ 1
        // new Date(Năm, Tháng Sau, Ngày i)
        const nextDate = new Date(currentYear, currentMonth + 1, i);
        datesArray.push(
          <div key={`next-${i}`} className="date inactive text-gray-400 p-2">
            {nextDate.getDate()} {/* SỬA LỖI: Dùng getDate() */}
          </div>
        );
      }
    }

    return { monthYearString, datesArray };
  };

  const { monthYearString, datesArray } = renderDates();

  // --- Xử lý Tương tác ---
  function handleNextBtn() {
    // Luôn tạo đối tượng Date mới để kích hoạt State Update
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(newDate);
  }
  function handlePrevBtn() {
    // Luôn tạo đối tượng Date mới để kích hoạt State Update
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(newDate);
  }

  // --- Giao diện (JSX) ---
  return (
    <>
      <div className="calendar w-[300px] bg-white 0 p-4 rounded-lg shadow-xl flex flex-col items-center">
        
        {/* Header: Navigation and Month/Year */}
        <div className="flex gap-5 justify-between w-full mb-3 items-center">
          <div id="prevBtn" onClick={handlePrevBtn} className="cursor-pointer">
            <LuCircleChevronLeft className="size-8 text-gray-600 hover:text-blue-500 transition duration-150" />
          </div>
          
          <div id="monthYear" className="font-bold text-lg text-gray-800 capitalize">
            {monthYearString}
          </div>

          <div className="nextBtn cursor-pointer" onClick={handleNextBtn}>
            <LuCircleChevronRight className="size-8 text-gray-600 hover:text-blue-500 transition duration-150" />
          </div>
        </div>
        
        {/* Days of the Week */}
        <div className="grid grid-cols-7 gap-1 text-center w-full font-bold text-sm text-gray-500 border-b pb-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <p key={day} className="p-2">{day}</p>
          ))}
        </div>

        {/* Dates Grid */}
        <div id="dates" className="grid grid-cols-7 gap-1 text-center w-full">
          {datesArray}
        </div>

      </div>
    </>
  );
}