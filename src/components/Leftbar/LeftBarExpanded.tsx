import imgProfile from "../../assets/profile.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiClipboard, FiPlus, FiLogOut } from "react-icons/fi";
import { useModal } from "../../hooks/useModal";
import { motion } from "framer-motion";
import { useEntornos } from "../../hooks/useEntornos";
import { NuevoModal } from "../Modal/NuevoModal";

export const LeftBarExpanded = () => {
  const { modal, toggleModal } = useModal();
  const { entornos } = useEntornos();

  return (
    <motion.div className="bg-primary md:w-2/12 w-full md:h-full h-3/24 flex md:flex-col items-center justify-between md:px-0 md:py-8 px-4">
      <GiHamburgerMenu className="text-white md:hidden transform scale-125" />
      {/* <h3 className="text-white font-semibold text-4xl">Casa</h3> */}

      <div id="profile" className="flex flex-col items-center">
        <div className="flex flex-col text-white items-center space-y-3">
          <img
            className="rounded-full w-12"
            src={imgProfile}
            alt="Profile icon"
          />
          <h2 className="font-semibold">Jorge Rojas's Panel</h2>
        </div>
        <div className="w-14 border-b hidden md:block mt-6 border-white opacity-50"></div>
        <div id="enviroments" className="mt-10 hidden md:block">
          <div className="flex justify-center items-center space-x-3">
            <FiClipboard className="text-white w-8 h-8" />
            <h1 className="text-white font-semibold">Entornos</h1>
          </div>
          <ul className="text-white flex self-center flex-col space-y-10 mt-10">
            {entornos?.map((e) => {
              return (
                <li key={e.id_enviro} className="ml-7 list-disc">
                  {e.enviro_name}
                </li>
              );
            })}
          </ul>
        </div>
        <button
          onClick={toggleModal}
          className="mt-56 bg-secondary flex text-white p-3 rounded-md"
        >
          <FiPlus className="w-5 h-5" />
          <h4 className="font-semibold">Añadir Entorno</h4>
        </button>
        <div className="w-10 border-b hidden md:block mt-6 border-white opacity-50"></div>
        <div className="flex justify-center cursor-pointer text-white space-x-3 mt-8 items-center">
          <FiLogOut className="w-5 h-5" />
          <h2>Salir</h2>
        </div>
        {modal && (
          <NuevoModal
            title="Nuevo Entorno"
            placeholder="Nombre del entorno"
            closable={toggleModal}
            name="enviro_name"
          />
        )}
      </div>
    </motion.div>
  );
};
