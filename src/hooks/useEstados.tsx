import { useCallback, useState } from "react";
import todoAPI from "../api/todoAPI";
import { IState } from "../interfaces/State";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setStates } from "../slice/stateSlice";

export const useEstados = () => {
  const dispatch = useAppDispatch();
  const estados = useAppSelector((state) => state.states);

  const consumirEstados = useCallback(async () => {
    const { data } = await todoAPI.get<IState[]>("/state");

    dispatch(
      setStates(
        data.sort((a: IState, b: IState) => {
          return a.id_state! - b.id_state!;
        })
      )
    );
  }, []);

  const actualizarEstado = useCallback(
    async (id_estado: number) => {
      await todoAPI.patch("/state/update/" + id_estado);

      consumirEstados();
    },
    [consumirEstados]
  );

  return {
    estados,
    consumirEstados,
    actualizarEstado,
  };
};
