import { useAppSelector } from "../../hooks";
import { FiEdit } from "react-icons/fi";
import { Tasks } from "../Tasks/Tasks";
import { useModal } from "../../hooks/useModal";
import { NuevoModal } from "../Modal/NuevoModal";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";

export const Enviroment = () => {
  const { enviro_name } = useAppSelector((state) => state.currentEnvironment);
  const [type, setType] = useState("");
  const { modal, toggleModal } = useModal();

  const toggleType = (newType: string) => {
    toggleModal();
    setType(newType);
  };

  return (
    <>
      <div className="w-full h-full self-stretch justify-self-stretch">
        <div className="mt-10 flex flex-col">
          <div className="flex justify-around md:justify-start">
            <div className="flex">
              <h1 className="md:pl-20 font-semibold md:text-5xl text-4xl">
                {enviro_name}
              </h1>
              <FiEdit
                className="md:ml-5 ml-3 cursor-pointer md:w-4 md:h-4 w-3 h-3"
                onClick={() => toggleType("entorno")}
              />
            </div>
            <div
              onClick={() => toggleType("tarea")}
              className="flex text-white md:px-5 px-3 py-2 md:py-0 rounded-xl cursor-pointer md:hidden items-center bg-primary"
            >
              <FiPlus className="md:mr-6 mr-2 md:text-xl text-base" />
              <p className="md:text-base text-sm">Añadir tarea</p>
            </div>
          </div>
          <div className="bg-black mt-7 opacity-10 w-full h-px"></div>
        </div>
        <div className="flex flex-col">
          <Tasks />
        </div>
        {modal && type === "entorno" && (
          <NuevoModal
            title="Editar Entorno"
            placeholder="Nombre del entorno"
            closable={toggleModal}
            name="enviro_name"
            successMessage="¡Entorno actualizado!"
            type="editar"
          />
        )}
        {modal && type === "tarea" && (
          <NuevoModal
            title="Nueva Tarea"
            placeholder="Nombre de la tarea"
            closable={toggleModal}
            name="description"
            successMessage="¡Tarea Creada!"
          />
        )}
      </div>
    </>
  );
};
