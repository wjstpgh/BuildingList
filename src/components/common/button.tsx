import React from "react";

interface ButtonProps {
  btnText: string;
  onClickAction: React.MouseEventHandler<HTMLButtonElement>;
  btnStyleType?: "radial" | "linear" | "shadow" | "curtain";
  classBtnWrap?: string;
  disabled?: boolean;
  toogleOpacity?: boolean;
}

const styleType = {
  shadow:
    "enabled:active:shadow-[4px_4px_6px_0_rgba(255,255,255,.5),-2px_-2px_6px_0_rgba(116,125,136,.4),inset_2px_2px_6px_0_rgba(0,0,0,.4)] enabled:hover:shadow-[inset_2px_2px_2px_0_rgba(255,255,255,.5),7px_7px_20px_0_rgba(0,0,0,.1),4px_4px_5px_0_rgba(0,0,0,.1)]",
  curtain:
    "text-white shadow-[inset_2px_2px_2px_0_rgba(255,255,255,0.5),7px_7px_20px_0_rgba(0,0,0,0.1),4px_4px_5px_0_rgba(0,0,0,0.1)] relative bg-[#89d8d3] bg-[linear-gradient(315deg,#89d8d3_0%,#03c8a8_74%)] z-[1] after:absolute after:content-[''] after:w-full after:h-[0%] after:bottom-0 after:left-0 after:rounded-[5px] after:#4dccc6 after:bg-[linear-gradient(315deg,#4dccc6_0%,#96e4df_74%)] after:shadow-[-7px_-7px_20px_0_#fff9,-4px_-4px_5px_0px_#fff9,7px_7px_20px_0px_#0002,4px_4px_5px_0px_#0001] after:-z-[1] after:transition-all after:ease-in-out hover:after:top-0 hover:after:h-[100%] active:top-[2px]",
  linear:
    "bg-[linear-gradient(to_right,#25aae1,#4481eb,#04befe,#3f86ed)] disabled:bg-[linear-gradient(to_right,#6c8b98af,#0f1d36af,#05394baf,#0f1f37af)] bg-[length:300%_100%] enabled:hover:bg-[100%_0] enabled:active:bg-[70%_0] shadow-[0_4px_15px_0_rgba(65,132,234,0.75)] disabled:shadow-[0_4px_15px_0_rgba(0,0,0,0.75)] active:shadow-[1px_3px_6px_2px_rgba(65,132,234,0.9)] text-blue-100 hover:text-blue-50 rounded-[10px]",
  radial:
    "bg-[radial-gradient(60%_55%_at_70%_50%,#87ceeb,#1e90ff)] disabled:bg-[radial-gradient(60%_55%_at_70%_50%,#6c8b98,#0f1d36)] enabled:hover:bg-[radial-gradient(40%_45%_at_70%_50%,#b1dbec,#1e90ff)] active:bg-[radial-gradient(100%_100%_at_50%_40%,#1e90ff,#87ceeb)] text-blue-50 rounded-[10px]",
};

const Button = ({
  btnText,
  onClickAction,
  btnStyleType = "linear",
  classBtnWrap = "",
  disabled = false,
  toogleOpacity = false,
}: ButtonProps) => {
  return (
    <div className={classBtnWrap}>
      <button
        className={`px-[18px] py-[8px] ${styleType[btnStyleType]} ${
          toogleOpacity && "opacity-[30%]"
        } transition-all duration-[.5s]`}
        onClick={onClickAction}
        disabled={disabled}
      >
        {btnText}
      </button>
    </div>
  );
};

export default Button;
