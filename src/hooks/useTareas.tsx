import { useAppSelector, useAppDispatch } from "../hooks";
import { addTask, setTasks } from "../slice/tasksSlice";
import todoAPI from "../api/todoAPI";
import { ITask } from "../interfaces/Task";
import { useEstados } from "./useEstados";

export const useTareas = () => {
  const tasks = useAppSelector((state) => state.tasks);
  const { id_enviro } = useAppSelector((state) => state.currentEnvironment);
  const { estados, actualizarEstado, consumirEstados } = useEstados();
  const dispatch = useAppDispatch();

  const consumirTareas = async () => {
    const { data } = await todoAPI.get<ITask[]>(`/tasks/${id_enviro}`);

    dispatch(
      setTasks(
        data.sort((a: ITask, b: ITask) => {
          return a.id_task! - b.id_task!;
        })
      )
    );
  };

  const registrarTarea = async (description: string, fk_enviroment: number) => {
    const { data } = await todoAPI.post<ITask>("/tasks/create", {
      description,
      fk_enviroment,
      fk_state: estados[0].id_state,
    });

    actualizarEstado(estados[0].id_state);

    dispatch(addTask(data));
  };

  const intercambiarIdsTarea = async (
    originTask: number,
    destinationTask: number
  ) => {
    try {
      await todoAPI.patch<ITask[]>(
        `/tasks/updateIds/${originTask}/${destinationTask}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const eliminarTarea = async (id: number) => {
    await todoAPI.delete(`/tasks/delete/${id}`);
    consumirTareas();
  };

  const actualizarTarea = async (id_task: number, description: string) => {
    await todoAPI.patch(`/tasks/update/${id_task}/${description}`);
    consumirTareas();
  };

  const actualizarEstadoDeTarea = async (id_task: number, fk_state: number) => {
    await todoAPI.patch(`/tasks/updateStateFk/${id_task}/${fk_state}`);
    consumirEstados();
  };

  return {
    tasks,
    consumirTareas,
    registrarTarea,
    eliminarTarea,
    actualizarTarea,
    intercambiarIdsTarea,
    actualizarEstadoDeTarea,
  };
};
