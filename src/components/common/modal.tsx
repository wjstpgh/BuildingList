import React from "react";
import Button from "./button";

interface ModalProps {
  inlineContent: string | React.JSX.Element;
  onClickClose: () => void;
  btnText?: string;
}

const Modal = ({
  inlineContent,
  onClickClose,
  btnText = "확인",
}: ModalProps) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,45,0.2)] backdrop-blur-[3px] z-10">
      <div className="min-w-[300px] min-h-[170px] flex flex-col justify-between items-center p-[30px] bg-[rgba(255,255,255,0.7)] rounded-[10px]">
        <p className="text-[16px] text-gray-700">{inlineContent}</p>
        <Button
          btnText={btnText}
          onClickAction={onClickClose}
          btnStyleType="curtain"
        />
      </div>
    </div>
  );
};

export default Modal;
