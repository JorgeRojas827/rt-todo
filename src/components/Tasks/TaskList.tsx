import { useState } from "react";
import { ITask } from "../../interfaces/Task";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { useTareas } from "../../hooks/useTareas";
import { useEstados } from "../../hooks/useEstados";
import { useModal } from "../../hooks/useModal";
import { NuevoModal } from "../Modal/NuevoModal";

interface IProps {
  task: ITask;
}

export const TaskList = ({
  task: { description, id_task, fk_state },
}: IProps) => {
  const [marked, setMarked] = useState(false);
  const { eliminarTarea } = useTareas();
  const { actualizarEstado } = useEstados();
  const { modal, toggleModal } = useModal();

  const deleteTask = () => {
    eliminarTarea(id_task!);
    actualizarEstado(fk_state!);
  };

  return (
    <div className="rounded-xl shadow-default mb-7 px-5 py-4 w-full flex">
      <div className="relative flex items-center justify-between w-full">
        <div className="w-full flex items-center">
          <input
            onClick={() => setMarked(!marked)}
            className="w-4 h-4"
            type="checkbox"
          />
          {marked ? (
            <del className="ml-5 font-semibold text-left">{description}</del>
          ) : (
            <h2 className="ml-5 font-semibold text-left">{description}</h2>
          )}
        </div>
        <div className="flex items-center justify-center absolute md:right-5 right-2">
          <FiEdit onClick={toggleModal} className="cursor-pointer" size={16} />
          <BsTrash
            onClick={deleteTask}
            className="ml-5 cursor-pointer"
            size={16}
          />
        </div>
      </div>
      {modal && (
        <NuevoModal
          title="Editar Tarea"
          placeholder="Nombre de la tarea"
          closable={toggleModal}
          name="description"
          successMessage="¡Tarea actualizada!"
          type="editar"
          id_task={id_task}
        />
      )}
    </div>
  );
};
