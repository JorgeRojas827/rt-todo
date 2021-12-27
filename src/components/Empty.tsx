import React from "react";
import { IconType } from "react-icons/lib";
import { ToastContainer } from "react-toastify";
import { useModal } from "../hooks/useModal";
import { NuevoModal } from "./Modal/NuevoModal";

interface IProps {
  Icon: IconType;
  title: string;
  open?: boolean;
  titleModal?: string;
  placeholder?: string;
  name?: string;
  clickable?: boolean;
  successMessage?: string;
}

export const Empty = ({
  Icon,
  title,
  open,
  titleModal,
  placeholder,
  name,
  clickable,
  successMessage,
}: IProps) => {
  const { modal, toggleModal } = useModal();

  return (
    <React.Fragment>
      <div
        className="flex-col flex text-terciary"
        style={{ cursor: clickable ? "pointer" : "default" }}
      >
        <Icon
          className="w-10 h-10 md:w-14 md:h-14 self-center opacity-75"
          onClick={toggleModal}
        />
        <p className="text-xs md:text-2xl">{title}</p>
      </div>
      {open && modal && (
        <NuevoModal
          closable={toggleModal}
          title={titleModal!}
          placeholder={placeholder!}
          name={name!}
          successMessage={successMessage!}
        />
      )}
      <ToastContainer position="bottom-right" autoClose={2000} />
    </React.Fragment>
  );
};
