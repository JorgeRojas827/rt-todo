import { useState } from "react";
import { ITask } from "../../interfaces/Task";

interface IProps {
  task: ITask;
}

export const TaskList = ({
  task: { description, id_task, fk_state },
}: IProps) => {
  const [marked, setMarked] = useState(false);

  return (
    <div className="rounded-xl shadow-default mb-7 px-5 py-4 w-full relative flex justify-between">
      <div className="w-20 flex items-center">
        <input
          onClick={() => setMarked(!marked)}
          className="w-4 h-4"
          type="checkbox"
        />
        {marked ? (
          <del className="ml-5 font-semibold text-left">{description}</del>
        ) : (
          <h2 className="ml-5 font-semibold text-left">{description}</h2>
        )}
      </div>
    </div>
  );
};
