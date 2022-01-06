import { EmptyEnviroment } from "./EmptyEnviroment";
import { Enviroment } from "./Enviroment";

import { Principal } from "../../views/Principal";
import { useAppSelector } from "../../hooks";

export const Main = () => {
  const { enviro_name } = useAppSelector((state) => state.currentEnvironment);

  return (
    <div className="h-21/24 md:h-full md:w-full w-full flex justify-center items-center ">
      {enviro_name.length > 0 ? <Enviroment /> : <EmptyEnviroment />}
    </div>
  );
};
