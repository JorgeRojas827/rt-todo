import React from "react";
import { IoIosClose } from "react-icons/io";

interface IProps {
  message: string;
  type: string;
  closable?: () => void;
}

export const AlertModal = ({ message, type, closable }: IProps) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-50 absolute left-0 top-0">
      <div className="bg-background relative rounded-lg w-72 md:w-96 h-36 md:h-60 flex flex-col justify-start items-center py-4">
        <div
          id="head"
          className="flex justify-center items-center flex-col w-full"
        >
          <h2 className="text-primary mt-3 font-semibold text-lg">{message}</h2>
          <div className="w-32 border-b hidden md:block mt-1 border-black opacity-10"></div>
        </div>
        <div id="content">
          {closable && (
            <IoIosClose
              className="w-8 h-8 absolute cursor-pointer right-10 top-6"
              onClick={closable}
            />
          )}
        </div>
      </div>
    </div>
  );
};
