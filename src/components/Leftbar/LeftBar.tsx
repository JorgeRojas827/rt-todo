import { GiHamburgerMenu } from "react-icons/gi";
import { FiClipboard, FiPlus, FiLogOut } from "react-icons/fi";
import { useModal } from "../../hooks/useModal";
import { motion } from "framer-motion";
import { GoogleLogout } from "react-google-login";
import { NuevoModal } from "../Modal/NuevoModal";
import { useEffect, useState } from "react";
import { useEntornos } from "../../hooks/useEntornos";
import { Enviroment } from "../../interfaces/Enviroment";
import { useMiembros } from "../../hooks/useMiembros";
import { useAppDispatch } from "../../hooks";
import { setCurrentEntorno } from "../../slice/currentEnviromentSlice";
import { useTareas } from "../../hooks/useTareas";
import { LeftBarMobile } from "./LeftBarMobile";

export const LeftBar = () => {
  const { modal, toggleModal } = useModal();
  const [toggled, setToggled] = useState(false);
  const [burger, setBurger] = useState(false);
  const { user } = useMiembros();
  const { entornos, consumirEntornos } = useEntornos();
  const { consumirTareas } = useTareas();
  const dispatch = useAppDispatch();

  useEffect(() => {
    consumirEntornos(user.email!);
  }, [consumirEntornos, user.email]);

  // TODO: Responsive leftside, tasks, TODO
  // TODO: Testear con diferentes usuarios

  const clientId =
    "49630108708-sdv7af5n5jkbeame78v61phj3tftrhnr.apps.googleusercontent.com";

  const toggleBar = () => {
    setToggled(!toggled);
  };

  const toggleBurguer = () => {
    setBurger(!burger);
  };

  return (
    <motion.div
      whileHover={{ width: "200px" }}
      onHoverStart={toggleBar}
      onHoverEnd={toggleBar}
      className="bg-primary md:w-leftBar w-full md:h-full h-3/24 flex md:flex-col justify-between items-center md:px-0 md:py-8 px-4"
    >
      <GiHamburgerMenu
        className="text-white md:hidden transform scale-125"
        onClick={toggleBurguer}
      />
      <div id="profile" className="flex flex-col items-center ">
        <img
          className="rounded-full w-12"
          src={user.image}
          alt="Profile icon"
        />
        {toggled && (
          <h1 className="text-white mt-3 hidden md:block font-semibold">
            {user.name}
          </h1>
        )}
        <div className="w-14 border-b hidden md:block mt-6 border-white opacity-50"></div>
      </div>
      <div id="enviroments" className="mt-16 hidden md:block">
        <div className="flex justify-center items-center">
          <FiClipboard className="text-white w-8 h-8" />
          {toggled && (
            <h2 className="ml-2 text-white font-semibold">Entornos</h2>
          )}
        </div>
        <ul className="text-white flex self-center flex-col space-y-10 mt-10">
          {entornos &&
            entornos.map(({ enviro_name, id_enviro }: Enviroment) => {
              return (
                <li key={id_enviro} className="ml-7 cursor-pointer list-disc">
                  <p
                    onClick={() => {
                      dispatch(setCurrentEntorno({ id_enviro, enviro_name }));
                      consumirTareas();
                    }}
                  >
                    {toggled && enviro_name}
                  </p>
                </li>
              );
            })}
        </ul>
      </div>
      <LeftBarMobile
        clientId={clientId}
        toggleBar={toggleBar}
        toggleBurguer={toggleBurguer}
        burguer={burger}
      />
      <div
        id="bottom"
        className=" flex-col justify-end items-center hidden md:flex h-full "
      >
        <button
          onClick={() => {
            toggleBar();
            toggleModal();
          }}
          className="bg-secondary text-white flex items-center space-x-1 p-3 rounded-md"
        >
          <FiPlus className="w-5 h-5" />
          {toggled && <h1 className="text-sm font-semibold">Añadir Entorno</h1>}
        </button>
        <div className="w-10 border-b hidden md:block mt-6 border-white opacity-50"></div>
        <GoogleLogout
          clientId={clientId}
          render={(renderProps) => (
            <div
              onClick={renderProps.onClick}
              className="flex mt-8 items-center cursor-pointer space-x-3 justify-center"
            >
              <FiLogOut className="w-5 h-5 text-white" />
              {toggled && <h1 className="text-white text-sm">Salir</h1>}
            </div>
          )}
          buttonText="Logout"
          onLogoutSuccess={() => window.location.replace("")}
        />
        {modal && (
          <NuevoModal
            title="Nuevo Entorno"
            placeholder="Nombre del entorno"
            closable={toggleModal}
            name="enviro_name"
            successMessage="¡Entorno Creado!"
          />
        )}
      </div>
    </motion.div>
  );
};
