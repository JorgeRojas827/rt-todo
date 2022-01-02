import { BiGridAlt } from "react-icons/bi";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import { Tab } from "./Tab";
import { useEstados } from "../../hooks/useEstados";
import { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { NuevoModal } from "../Modal/NuevoModal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useTareas } from "../../hooks/useTareas";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setChanged } from "../../slice/dndSlice";
import { useEntornos } from "../../hooks/useEntornos";
import { EmptyTasks } from "./EmptyTasks";

export const Tasks = () => {
  const { estados, consumirEstados } = useEstados();
  const { modal, toggleModal } = useModal();
  const [empty, setEmpty] = useState<boolean>(true);
  const { changed } = useAppSelector((state) => state.dnd);
  const { enviro_name } = useAppSelector((state) => state.currentEnvironment);
  const { intercambiarIdsTarea, tasks, consumirTareas } = useTareas();
  const dispatch = useAppDispatch();

  // TODO: MANTENER LISTA AL INTERCAMBIAR TAREAS
  // TODO: AL CAMBIAR EL ENTORNO QUE SE RESETEE LAS TAREAS
  // TODO: CAMBIAR EL ESTADO AL INTERCAMBIAR

  useEffect(() => {
    consumirEstados();
    consumirTareas();
  }, [enviro_name, tasks.length, changed]);

  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    intercambiarIdsTarea(source.index, destination.index);
    dispatch(setChanged(true));
    setTimeout(() => {
      dispatch(setChanged(false));
    }, 2000);
  };

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
                  setEmpty={setEmpty}
                  empty={empty}
                  state={estado}
                />
              );
            })}
          </DragDropContext>
        </div>
        {empty && <EmptyTasks />}
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
