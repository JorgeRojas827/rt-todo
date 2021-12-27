import { BiGridAlt } from "react-icons/bi";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import { Tab } from "./Tab";
import { useEstados } from "../../hooks/useEstados";
import { useCallback, useEffect } from "react";
import { useModal } from "../../hooks/useModal";
import { NuevoModal } from "../Modal/NuevoModal";
import { DragDropContext } from "react-beautiful-dnd";

export const Tasks = () => {
  const { estados, consumirEstados } = useEstados();
  const { modal, toggleModal } = useModal();

  useEffect(() => {
    consumirEstados();
  }, [consumirEstados]);

  const onDragEnd = useCallback(() => {}, []);

  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex my-10 w-21/24 self-start ml-20 justify-between">
          <div className="flex">
            <div className="bg-primary cursor-pointer text-white p-2 rounded-tl-lg rounded-bl-lg">
              <BiGridAlt size={34} />
            </div>
            <div className="bg-white cursor-pointer text-primary p-2 rounded-tr-lg rounded-br-lg">
              <AiOutlineUnorderedList size={34} />
            </div>
          </div>
          <div
            onClick={toggleModal}
            className="flex text-white px-5 rounded-xl cursor-pointer items-center bg-primary"
          >
            <FiPlus className="mr-6" size={20} />
            <p>Añadir tarea</p>
          </div>
        </div>
        <div className="flex justify-between mb-10 w-10/12">
          <DragDropContext onDragEnd={onDragEnd}>
            {estados.map((estado) => {
              return (
                <Tab
                  key={estado.id_state}
                  id={estado.id_state}
                  title={estado.name}
                  cantidad={estado.cantity}
                  backgroundColor={estado.bkgColor}
                />
              );
            })}
          </DragDropContext>
        </div>
        {modal && (
          <NuevoModal
            title="Nueva Tarea"
            placeholder="Nombre de la tarea"
            closable={toggleModal}
            name="description"
            successMessage="¡Tarea Creada!"
          />
        )}
      </div>
    </div>
  );
};
