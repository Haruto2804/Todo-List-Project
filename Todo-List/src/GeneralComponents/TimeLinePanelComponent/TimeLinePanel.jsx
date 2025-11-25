import { Calendar } from "./Calendar";
import { UpComingDeadlines } from "./UpComingDeadlines";
import { TodayProgress } from "./TodayProgress";
import React, { useMemo } from 'react';
export const TimeLinePanel = React.memo((function TimeLinePanel({todo}) {
  const {total,completedTask, percent} = useMemo (()=> {
    const total = todo.length;
    const completedTask = todo.filter((task)=>task.completed).length;
    const percent = total === 0 ? 0 : Math.round((completedTask / total) * 100);
    return {
      total,
      completedTask,
      percent
    }
  },[todo])
  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 border-l overflow-auto
      border-gray-200 border-solid flex flex-col gap-4 justify-evenly
      bg-white
      px-3 py-2
      ">
        <Calendar></Calendar>
        <UpComingDeadlines></UpComingDeadlines>
        <TodayProgress total = {total} completedTask = {completedTask} percent = {percent}></TodayProgress>
      </div>
    </>
  )
}))