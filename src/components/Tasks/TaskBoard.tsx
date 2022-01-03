import { BsThreeDotsVertical, BsTrashFill } from "react-icons/bs";
import { useState } from "react";
import { useTareas } from "../../hooks/useTareas";
import { useEstados } from "../../hooks/useEstados";
import { ITask } from "../../interfaces/Task";

interface IProps {
  task: ITask;
}

export const TaskBoard = ({
  task: { description, id_task, fk_state },
}: IProps) => {
  const [open, setOpen] = useState(false);
  const { eliminarTarea } = useTareas();
  const { actualizarEstado } = useEstados();

  const toggle = () => {
    setOpen(!open);
  };

  const onClick = () => {
    eliminarTarea(id_task!);
    actualizarEstado(fk_state!);
  };

  return (
    <div className="rounded-xl shadow-default mb-7 px-5 py-4 w-64 relative flex justify-between">
      <div className="w-5/8">
        <h2 className="font-semibold text-left">{description}</h2>
      </div>
      <div className="w-3/8">
        <BsThreeDotsVertical
          className="cursor-pointer"
          onClick={toggle}
          size={20}
        />
      </div>
      {open && (
        <div className="flex justify-center absolute right-0 items-center w-10 h-10 rounded-full bg-white shadow-default">
          <BsTrashFill onClick={onClick} className="cursor-pointer" size={16} />
        </div>
      )}
    </div>
  );
};
