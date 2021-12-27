import { useCallback } from "react";
import todoAPI from "../api/todoAPI";
import { Enviroment } from "../interfaces/Enviroment";
import { useAppSelector, useAppDispatch } from "../hooks";
import { addEnviroment, setEnviroments } from "../slice/enviromentsSlice";

export const useEntornos = () => {
  const entornos = useAppSelector((state) => state.enviroments);
  const dispatch = useAppDispatch();

  const consumirEntornos = useCallback(
    async (name: string) => {
      const { data } = await todoAPI.get<Enviroment[]>("/enviroments/" + name);

      dispatch(
        setEnviroments(
          data.sort((a: Enviroment, b: Enviroment) => {
            return a.id_enviro! - b.id_enviro!;
          })
        )
      );
    },
    [dispatch]
  );

  const registrarEntornos = async (enviro_name: string, fk_member: number) => {
    const { data } = await todoAPI.post("/enviroments/create", {
      enviro_name,
      fk_member,
    });
    dispatch(addEnviroment(data));
  };

  return {
    entornos,
    registrarEntornos,
    consumirEntornos,
  };
};
