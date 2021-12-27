import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Empty } from "../Empty";

export const EmptyEnviroment = () => {
  return (
    <React.Fragment>
      <Empty
        open
        titleModal="Nombre del Entorno:"
        placeholder="Nombre del Entorno"
        name="enviro_name"
        clickable
        Icon={IoAddCircleOutline}
        successMessage="¡Entorno Creado!"
        title="Crear nuevo entorno de trabajo"
      />
    </React.Fragment>
  );
};
