import { useCallback, useState } from "react";
import todoAPI from "../api/todoAPI";
import { IState } from "../interfaces/State";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setStates } from "../slice/stateSlice";

export const useEstados = () => {
  const dispatch = useAppDispatch();
  const estados = useAppSelector((state) => state.states);
  const { id_enviro, enviro_name } = useAppSelector(
    (state) => state.currentEnvironment
  );

  const consumirEstados = useCallback(async () => {
    const { data } = await todoAPI.get<IState[]>("/state/" + id_enviro);

    dispatch(
      setStates(
        data.sort((a: IState, b: IState) => {
          return a.id_state! - b.id_state!;
        })
      )
    );
  }, [enviro_name]);

  const actualizarEstado = useCallback(async (id_estado: number) => {
    await todoAPI.patch("/state/update/" + id_estado);
  }, []);

  return {
    estados,
    consumirEstados,
    actualizarEstado,
  };
};
