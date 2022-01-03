import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useTareas } from "../../hooks/useTareas";
import { ITask } from "../../interfaces/Task";
import { useAppSelector } from "../../hooks";
import { useEstados } from "../../hooks/useEstados";
import { IState } from "../../interfaces/State";
import { TaskBoard } from "./TaskBoard";

interface IProps {
  state: IState;
  empty: boolean;
  setEmpty: Dispatch<SetStateAction<boolean>>;
}

export const TasksBoard = ({
  state: { id_state, bkgColor, name, cantity },
  empty,
  setEmpty,
}: IProps) => {
  const { tasks } = useTareas();
  const { actualizarEstado } = useEstados();
  const [tasksState, setTasksState] = useState<ITask[]>([]);
  const dnd = useAppSelector((state) => state.dnd);
  const { enviro_name } = useAppSelector((state) => state.currentEnvironment);

  // TODO: HABILITAR OPCIÓN DE BORRAR TAREA

  useEffect(() => {
    actualizarEstado(id_state);
    if (tasks.length === 0) {
      setTasksState([]);
      setEmpty(true);
    }
    if (tasksState.length !== 0) {
      setEmpty(false);
    }
    tasks.forEach(() => {
      setTasksState(tasks.filter((task) => task.fk_state === id_state));
    });
  }, [tasks.length, enviro_name, dnd.changed, tasksState.length]);

  return (
    <div className="flex flex-col">
      <div className="flex relative justify-between">
        <div className="px-2 mr-3 font-semibold relative">
          <div
            className="px-2 mr-3 rounded-md top-0 left-0 z-10 w-full h-full absolute"
            style={{ backgroundColor: bkgColor }}
          ></div>
          <p>{name}</p>
        </div>
        <p className="ml-10">{cantity}</p>
        <div className="absolute w-full bg-firstTab h-px top-8"></div>
      </div>

      {!empty && (
        <div
          id="tasks"
          className="mt-6 overflow-hidden p-1 h-96"
          style={{ overflowY: tasksState.length >= 5 ? "scroll" : "hidden" }}
        >
          <Droppable droppableId={id_state.toString()}>
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {tasksState.map((task: ITask) => {
                  return (
                    <Draggable
                      key={task.id_task}
                      draggableId={task.id_task!.toString()}
                      index={task.id_task!}
                    >
                      {(provided, snapshot) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <TaskBoard task={task} />
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
      )}
    </div>
  );
};
