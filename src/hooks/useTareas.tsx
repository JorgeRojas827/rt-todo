import { useAppSelector, useAppDispatch } from "../hooks";
import { useCallback } from "react";
import { addTask, setTasks } from "../slice/tasksSlice";
import todoAPI from "../api/todoAPI";
import { ITask } from "../interfaces/Task";

export const useTareas = () => {
  const tasks = useAppSelector((state) => state.tasks);
  const { enviro_name } = useAppSelector((state) => state.currentEnvironment);
  const dispatch = useAppDispatch();

  const consumirTareas = useCallback(async () => {
    const { data } = await todoAPI.get<ITask[]>(`/tasks/${enviro_name}`);

    dispatch(
      setTasks(
        data.sort((a: ITask, b: ITask) => {
          return a.id_task! - b.id_task!;
        })
      )
    );
  }, [dispatch, enviro_name]);

  const registrarTarea = async (description: string, fk_enviroment: number) => {
    const { data } = await todoAPI.post("/tasks/create", {
      description,
      fk_enviroment,
    });

    dispatch(addTask(data));
  };

  return {
    tasks,
    consumirTareas,
    registrarTarea,
  };
};
