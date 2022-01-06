import { BsTrash } from "react-icons/bs";
import { useTareas } from "../../hooks/useTareas";
import { useEstados } from "../../hooks/useEstados";
import { ITask } from "../../interfaces/Task";
import { FiEdit } from "react-icons/fi";
import { useModal } from "../../hooks/useModal";
import { NuevoModal } from "../Modal/NuevoModal";

interface IProps {
  task: ITask;
}

export const TaskBoard = ({
  task: { description, id_task, fk_state },
}: IProps) => {
  const { eliminarTarea } = useTareas();
  const { actualizarEstado } = useEstados();
  const { modal, toggleModal } = useModal();

  const deleteTask = () => {
    eliminarTarea(id_task!);
    actualizarEstado(fk_state!);
  };

  return (
    <>
      <div className="rounded-xl shadow-default mb-7 px-5 py-4 w-64 flex items-center justify-between">
        <div className="w-5/8">
          <h2 className="font-semibold text-left">{description}</h2>
        </div>
        <div className="flex w-3/8 items-center justify-center">
          <FiEdit onClick={toggleModal} className="cursor-pointer" size={16} />
          <BsTrash
            onClick={deleteTask}
            className="ml-5 cursor-pointer"
            size={16}
          />
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
    </>
  );
};
