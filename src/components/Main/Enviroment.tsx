import { useAppSelector } from "../../hooks";
import { FiEdit } from "react-icons/fi";
import { Tasks } from "../Tasks/Tasks";

export const Enviroment = () => {
  const { enviro_name } = useAppSelector((state) => state.currentEnvironment);

  return (
    <>
      <div className="mt-10 w-full self-stretch justify-self-stretch">
        <div className="flex">
          <h1 className="pl-20 font-semibold text-5xl">{enviro_name}</h1>
          <FiEdit className="ml-5 cursor-pointer" size={14}></FiEdit>
        </div>
        <div className="bg-black mt-7 opacity-10 w-full h-px"></div>
        <div className="">
          <Tasks />
        </div>
      </div>
    </>
  );
};
