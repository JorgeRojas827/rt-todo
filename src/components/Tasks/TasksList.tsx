import React, { Dispatch, SetStateAction, useState } from "react";
import { useEstados } from "../../hooks/useEstados";
import { useEffect } from "react";
import { useTareas } from "../../hooks/useTareas";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { ITask } from "../../interfaces/Task";
import { TaskList } from "./TaskList";

interface IProps {
  empty: boolean;
  setEmpty: Dispatch<SetStateAction<boolean>>;
}

export const TasksList = ({ empty }: IProps) => {
  const { estados, actualizarEstado } = useEstados();
  const { tasks } = useTareas();
  const [cantity, setCantity] = useState(0);

  const calcularTotal = () => {
    estados.length !== 0 &&
      setCantity(estados.map((e) => e.cantity).reduce((acc, el) => acc + el));
  };

  useEffect(() => {
    estados.length !== 0 && actualizarEstado(estados[0].id_state);
    calcularTotal();
  }, [tasks.length, JSON.stringify(estados), JSON.stringify(tasks)]);

  return (
    <React.Fragment>
      <div className="w-11/12 flex flex-col justify-center">
        <div className="w-full flex justify-between items-center opacity-50 text-xl">
          <h5>Tareas</h5>
          <h4 className="md:text-base text-sm mr-2 md:mr-0">{cantity}</h4>
        </div>
        <div className="bg-black md:mt-3 mt-1 opacity-10 w-full h-px"></div>
        {!empty && (
          <div
            id="tasks"
            className="mt-6 overflow-hidden p-1 h-96"
            style={{ overflowY: tasks.length >= 5 ? "scroll" : "hidden" }}
          >
            <Droppable droppableId="1">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {tasks.map((task: ITask) => {
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
                            <TaskList task={task} />
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
    </React.Fragment>
  );
};
