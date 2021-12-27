import { useEffect, useState, useCallback } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { HiDotsHorizontal } from "react-icons/hi";
import { useTareas } from "../../hooks/useTareas";
import { EmptyTasks } from "./EmptyTasks";
import { Task } from "./Task";
import { ITask } from "../../interfaces/Task";
import { useEstados } from "../../hooks/useEstados";

interface IProps {
  id: number;
  backgroundColor: string;
  title: string;
  cantidad: number;
}

export const Tab = ({ id, backgroundColor, title, cantidad }: IProps) => {
  const { tasks, consumirTareas } = useTareas();
  const [tasksState, setTasksState] = useState<ITask[]>([]);

  const filtrarTareas = useCallback(async () => {
    await consumirTareas();
    tasks.forEach(() => {
      setTasksState(tasks.filter((task) => task.fk_state === id));
    });
  }, [consumirTareas, id, tasks.length]);

  useEffect(() => {
    filtrarTareas();
  }, [filtrarTareas]);

  return (
    <div className="flex flex-col">
      <div className="flex relative">
        <div className="px-2 mr-3 font-semibold relative">
          <div
            className="px-2 mr-3 rounded-md top-0 left-0 z-10 w-full h-full absolute"
            style={{ backgroundColor }}
          ></div>
          <p>{title}</p>
        </div>
        <p className="mr-10">{cantidad}</p>
        <HiDotsHorizontal className="cursor-pointer" size={20} />
        <div className="absolute w-full bg-firstTab h-px top-8"></div>
      </div>

      <div id="tasks" className="mt-10">
        <Droppable droppableId={id.toString()}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {tasksState.length !== 0 &&
                tasksState.map((task: ITask) => {
                  return (
                    <Draggable
                      key={task.id_task}
                      draggableId={task.id_task!.toString()}
                      index={task.id_task!}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task contenido={task.description} />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};
