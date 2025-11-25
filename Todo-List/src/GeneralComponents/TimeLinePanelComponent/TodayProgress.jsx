import React from 'react'
export const TodayProgress = React.memo(function TodayProgress({ total, completedTask, percent }) {
  console.log('rerender today progerss')
  return (
    <>
      <div className="flex flex-col gap-3">
        <p className="font-bold text-lg">Today's Progress</p>
        <div className="flex gap-3 items-center">
          <div className="progress-percent text-xl font-bold w-20 flex justify-center">{percent}%</div>
          <div className="flex flex-col gap-1">
            <p className=" text-xl font-bold w-20">
              {completedTask}/{total}
            </p>
            <p className="text-gray-500 text-sm">
              Great start!
            </p>
          </div>

        </div>
      </div>
    </>
  )
})