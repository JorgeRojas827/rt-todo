import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Empty } from "../Empty";

export const EmptyTasks = () => {
  return (
    <React.Fragment>
      <div className="mt-24">
        <Empty
          Icon={IoCheckmarkCircleOutline}
          title="No tienes tareas pendientes"
        />
      </div>
    </React.Fragment>
  );
};
