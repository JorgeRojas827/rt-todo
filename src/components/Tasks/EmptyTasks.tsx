import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Empty } from "../Empty";

export const EmptyTasks = () => {
  return (
    <React.Fragment>
      <Empty
        Icon={IoCheckmarkCircleOutline}
        title="No tienes tareas pendientes"
      />
    </React.Fragment>
  );
};
