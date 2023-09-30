import React from 'react'

const InputComponent = ({ref_,elem_id,label_name}) => {
  return (
    <div className="flex flex-col gap-3 justify-between">
      <label htmlFor={elem_id} className="text-xl font-semibold text-gray-700">
        {label_name}
      </label>
      <input
        type="text"
        id={elem_id}
        ref={ref_}
        className="bg-gray-200 h-9 p-2"
      />
    </div>
  );
}

export default InputComponent