import React from "react";

interface CheckBoxProps {
  id: string;
  checked: boolean;
  onClick: () => void;
}

const CheckBox = ({ id, checked, onClick }: CheckBoxProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="w-[20px] h-[20px] flex justify-center items-center border-[2px] border-[#000] rounded-[4px] cursor-pointer active:scale-[1.1] duration-[.1s]"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 11.6L10.25 17L19 8"
            stroke="#000"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={`${checked ? "22 100" : "0 100"}`}
            strokeDashoffset={1}
            className="duration-[.5s]"
          />
        </svg>
      </label>
      <input
        type="checkbox"
        id={id}
        name={id}
        className="hidden"
        checked={checked}
        onChange={onClick}
      />
    </div>
  );
};

export default CheckBox;
