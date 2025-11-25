import { Calendar } from "./Calendar";
import { UpComingDeadlines } from "./UpComingDeadlines";
import { TodayProgress } from "./TodayProgress";
import React, { useMemo } from 'react';
export const TimeLinePanel = React.memo((function TimeLinePanel({ upcomingTasks, todo }) {
  const { total, completedTask, percent } = useMemo(() => {
    const total = todo.length;
    const completedTask = todo.filter((task) => task.completed).length;
    const percent = total === 0 ? 0 : Math.round((completedTask / total) * 100);
    return {
      total,
      completedTask,
      percent
    }

  }, [todo])
  const getStartOfDay = (dateInput) => {
    if (!dateInput) return 0; // Trả về 0 nếu không có ngày
    const date = new Date(dateInput);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  };
  const handleTimeRemaining = (task) => {
    const ms_PER_DAY = 1000 * 60 * 60 * 24;
    const todayTimeStamp = getStartOfDay(new Date());
    const endDateTimeStamp = getStartOfDay(task.date);
    const timeDifference = endDateTimeStamp - todayTimeStamp;
    const timeSpan = Math.floor(timeDifference / ms_PER_DAY);
    return timeSpan;
  }
  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 border-l overflow-y-scroll
      border-gray-200 border-solid flex flex-col gap-4 justify-evenly
      bg-white max-w-85
      px-3 py-4
      ">
        <div className="flex flex-col gap-5">
          <Calendar className="basis-1/2"></Calendar>
          <UpComingDeadlines handleTimeRemaining={handleTimeRemaining} upcomingTasks={upcomingTasks} ></UpComingDeadlines>
          <TodayProgress total={total} completedTask={completedTask} percent={percent}></TodayProgress>
        </div>
      </div>
    </>
  )
}))