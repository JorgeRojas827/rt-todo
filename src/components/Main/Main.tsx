import { EmptyEnviroment } from "./EmptyEnviroment";
import { Enviroment } from "./Enviroment";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { Principal } from "../../views/Principal";
import { useAppSelector } from "../../hooks";

export const Main = () => {
  const { enviro_name } = useAppSelector((state) => state.currentEnvironment);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/entorno/:enviro_name" element={<Principal />} />
      </Routes>
      <div className="h-21/24 md:h-full md:w-full w-full flex justify-center items-center ">
        {enviro_name.length > 0 ? <Enviroment /> : <EmptyEnviroment />}
      </div>
    </BrowserRouter>
  );
};
