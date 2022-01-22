import React from "react";
import { FiClipboard, FiPlus, FiLogOut } from "react-icons/fi";
import { useEffect } from "react";
import { useEntornos } from "../../hooks/useEntornos";
import { useMiembros } from "../../hooks/useMiembros";
import { setCurrentEntorno } from "../../slice/currentEnviromentSlice";
import { useAppDispatch } from "../../hooks";
import { useTareas } from "../../hooks/useTareas";
import { Enviroment } from "../../interfaces/Enviroment";
import { useModal } from "../../hooks/useModal";
import { GoogleLogout } from "react-google-login";
import { NuevoModal } from "../Modal/NuevoModal";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion, Variants } from "framer-motion";

interface IProps {
  toggleBar: () => void;
  toggleBurguer: () => void;
  clientId: string;
  burguer: boolean;
}

export const LeftBarMobile = ({
  toggleBar,
  clientId,
  toggleBurguer,
  burguer,
}: IProps) => {
  const { entornos, consumirEntornos } = useEntornos();
  const { user } = useMiembros();
  const { modal, toggleModal } = useModal();
  const { consumirTareas } = useTareas();
  const dispatch = useAppDispatch();

  useEffect(() => {
    consumirEntornos(user.email!);
  }, [consumirEntornos, user.email]);

  const variants: Variants = {
    toggled: { width: "200px", visibility: "visible" },
    closed: { width: "0px", visibility: "hidden" },
  };

  return (
    <React.Fragment>
      <motion.div
        className="absolute h-full w-1/2 top-0 left-0 bg-primary z-50 md:hidden"
        variants={variants}
        initial="closed"
        animate={burguer ? "toggled" : "closed"}
      >
        <div className=" h-full w-full flex flex-col justify-center items-center">
          <GiHamburgerMenu
            className="text-white md:hidden transform mt-8 self-start w-16 h-16"
            onClick={toggleBurguer}
          />
          <div id="enviroments" className="mt-28">
            <div className="flex justify-center items-center">
              <FiClipboard className="text-white w-8 h-8" />
              <h2 className="ml-2 text-white font-semibold">Entornos</h2>
            </div>
            <ul className="text-white flex self-center flex-col space-y-10 mt-10">
              {entornos &&
                entornos.map(({ enviro_name, id_enviro }: Enviroment) => {
                  return (
                    <li
                      key={id_enviro}
                      className="ml-7 cursor-pointer list-disc"
                    >
                      <p
                        onClick={() => {
                          dispatch(
                            setCurrentEntorno({ id_enviro, enviro_name })
                          );
                          consumirTareas();
                        }}
                      >
                        {enviro_name}
                      </p>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div
            id="bottom"
            className="flex-col justify-end items-center md:hidden h-full mt-28"
          >
            <button
              onClick={() => {
                toggleBar();
                toggleModal();
              }}
              className="bg-secondary text-white flex items-center space-x-1 p-3 rounded-md"
            >
              <FiPlus className="w-5 h-5" />
              <h1 className="text-sm font-semibold">Añadir Entorno</h1>
            </button>
            <GoogleLogout
              clientId={clientId}
              render={(renderProps) => (
                <div
                  onClick={renderProps.onClick}
                  className="flex mt-8 items-center cursor-pointer space-x-3 justify-center"
                >
                  <FiLogOut className="w-5 h-5 text-white" />
                  <h1 className="text-white text-sm">Salir</h1>
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
        </div>
      </motion.div>
    </React.Fragment>
  );
};
