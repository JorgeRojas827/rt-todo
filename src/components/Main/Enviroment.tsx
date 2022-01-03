import { useAppSelector } from "../../hooks";
import { FiEdit } from "react-icons/fi";
import { Tasks } from "../Tasks/Tasks";
import { useModal } from "../../hooks/useModal";
import { NuevoModal } from "../Modal/NuevoModal";

export const Enviroment = () => {
  const { enviro_name } = useAppSelector((state) => state.currentEnvironment);
  const { modal, toggleModal } = useModal();

  return (
    <>
      <div className="w-full h-full self-stretch justify-self-stretch">
        <div className="mt-10 flex flex-col">
          <div className="flex">
            <h1 className="pl-20 font-semibold text-5xl">{enviro_name}</h1>
            <FiEdit
              className="ml-5 cursor-pointer"
              onClick={toggleModal}
              size={14}
            />
          </div>
          <div className="bg-black mt-7 opacity-10 w-full h-px"></div>
        </div>
        <div className="flex flex-col">
          <Tasks />
        </div>
        {modal && (
          <NuevoModal
            title="Editar Entorno"
            placeholder="Nombre del entorno"
            closable={toggleModal}
            name="enviro_name"
            successMessage="¡Entorno actualizado!"
            type="editar"
          />
        )}
      </div>
    </>
  );
};
