import { useState, useCallback } from "react";
import todoAPI from "../api/todoAPI";
import { IState } from "../interfaces/State";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setStates } from "../slice/stateSlice";

export const useEstados = () => {
  const dispatch = useAppDispatch();
  const estados = useAppSelector((state) => state.states);

  const consumirEstados = useCallback(async () => {
    const { data } = await todoAPI.get<IState[]>("/state");

    dispatch(setStates(data));
  }, []);

  const actualizarEstado = useCallback(async (id_estado: number) => {
    await todoAPI.patch("/state/update/" + id_estado);
  }, []);

  return {
    estados,
    consumirEstados,
    actualizarEstado,
  };
};
