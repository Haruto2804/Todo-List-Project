import { CiCalendar } from "react-icons/ci";

export function ModalInput({setTodoName,setDate, defaultDateString}) {
  
  return (
    <>
      <div className="flex gap-5">
        <div className="basis-1/2 flex flex-col gap-3">
          <p className="font-bold">Task Name</p>
          <input className=
            "rounded-sm border flex-1 border-gray-300 px-4 py-2 text-lg outline-none"
            type="text" placeholder="e.g, Design new dashboard" 
            value = "Create website with Haruto"
            onChange = {(e)=> setTodoName(e.target.value)}
            />
        </div>
        <div className="basis-1/2 flex flex-col gap-3">
          <p className="font-bold">Due Date</p>
          <div className="flex relative">
            <input className=
              "rounded-sm border flex-1 border-gray-300 px-4 py-2 text-lg outline-none"
              type="date" placeholder="e.g, Design new dashboard" 
              value = {defaultDateString}
              onChange = {(e)=> setDate(e.target.value)}/>
          </div>


        </div>



      </div>
    </>
  )
}