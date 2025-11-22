import { useState } from "react";

export function ModalPriority() {
  const [isSelectedPriority, setIsSelectedPriority] = useState('Medium');
  const priorities = [
    { color: 'bg-[#2ECC71]', value: 'Low' },
    { color: 'bg-[#efd721]', value: 'Medium' },
    { color: 'bg-[#f6270c]', value: 'High' },
  ];
  const handleSelectPriority = (value) => {
    setIsSelectedPriority(value);
  }
  return (
    <>
      <div className="flex flex-col gap-5 ">
        <div className="basis-1/2 flex flex-col gap-3">
          <p className="font-bold">Priority</p>
          <div className="flex gap-5">
            {priorities.map((p) => {
              const isSelected = p.value === isSelectedPriority;
              return (
                <button key={p.value}
                  onClick={() => handleSelectPriority(p.value)}
                  className=
                  {`    
                    border
                transition-all 
                shadow-xl rounded-lg flex items-center gap-4 basis-1/3 p-2 cursor-pointer
              ${isSelected
                      ? `opacity-100 border-green-500`
                      : 'opacity-50 border-gray-300'
                    }
              `}>
                  <span className={`w-2.5 h-2.5 rounded-full ${p.color}`}></span>
                  <p>{`${p.value}`}</p>
                </button>
              )

            })}



          </div>
        </div>




      </div>
    </>
  )
}