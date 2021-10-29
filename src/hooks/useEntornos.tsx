import { useEffect, useState } from "react";
import todoAPI from "../api/todoAPI";
import { Enviroment } from "../interfaces/Enviroment";

export const useEntornos = () => {
  const [entornos, setEntornos] = useState<Enviroment[]>();

  useEffect(() => {
    consumirEntornos();
  }, []);

  const consumirEntornos = async () => {
    const { data } = await todoAPI.get<Enviroment[]>("/enviroments");

    setEntornos(data);
  };

  const registrarEntornos = async (enviro_name: string) => {
    todoAPI.post("/enviroments/create", {
      enviro_name,
    });
  };

  return {
    entornos,
    registrarEntornos,
  };
};
