import { useAppSelector, useAppDispatch } from "../hooks";
import { useCallback } from "react";
import { addTask, setTasks } from "../slice/tasksSlice";
import todoAPI from "../api/todoAPI";
import { ITask } from "../interfaces/Task";
import { useEstados } from "./useEstados";

export const useTareas = () => {
  const tasks = useAppSelector((state) => state.tasks);
  const { enviro_name } = useAppSelector((state) => state.currentEnvironment);
  const { actualizarEstado } = useEstados();
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
    const { data } = await todoAPI.post<ITask>("/tasks/create", {
      description,
      fk_enviroment,
    });

    actualizarEstado(data.fk_state!);

    dispatch(addTask(data));
  };

  const intercambiarIdsTarea = async (
    originTask: number,
    destinationTask: number
  ) => {
    await todoAPI.patch<ITask[]>(
      `/tasks/updateIds/${originTask}/${destinationTask}`
    );

    consumirTareas();
  };

  return {
    tasks,
    consumirTareas,
    registrarTarea,
    intercambiarIdsTarea,
  };
};