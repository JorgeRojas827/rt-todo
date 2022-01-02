import { IoIosClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useEntornos } from "../../hooks/useEntornos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMiembros } from "../../hooks/useMiembros";
import { useTareas } from "../../hooks/useTareas";
import { useAppSelector } from "../../hooks";

interface IProps {
  title: string;
  name: string;
  children?: JSX.Element[] | JSX.Element;
  placeholder?: string;
  closable?: () => void;
  successMessage?: string;
  type?: string;
}

export const NuevoModal = ({
  title,
  children,
  name,
  placeholder,
  closable,
  successMessage,
  type,
}: IProps) => {
  const { register, handleSubmit } = useForm();
  const { id_enviro } = useAppSelector((state) => state.currentEnvironment);
  const { actualizarEntornos, registrarEntornos } = useEntornos();
  const { registrarTarea } = useTareas();
  const { user } = useMiembros();

  const onSubmit = ({ enviro_name, description }: any) => {
    switch (name) {
      case "enviro_name":
        if (type === "editar") {
          actualizarEntornos(id_enviro!, enviro_name);
        } else {
          registrarEntornos(enviro_name, user.id_user);
        }
        toast.success(successMessage, { position: "bottom-center" });
        break;
      case "description":
        registrarTarea(description, id_enviro!);
        toast.success(successMessage, { position: "bottom-center" });
        break;
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-50 absolute left-0 top-0">
      <div className="bg-background relative rounded-lg w-72 md:w-96 h-36 md:h-60 flex flex-col justify-start items-center py-4">
        <div id="head" className="flex ml-20 flex-col w-full">
          <h2 className="text-primary mt-3 font-semibold text-lg">{title}</h2>
          <div className="w-32 border-b hidden md:block mt-1 border-black opacity-10"></div>
        </div>
        <div id="content" className="w-full">
          {closable && (
            <IoIosClose
              className="w-8 h-8 absolute cursor-pointer right-10 top-6"
              onClick={closable}
            />
          )}
          {children ? (
            children
          ) : (
            <div id="form" className="w-full">
              <form
                className="flex flex-col w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  className="mt-6 p-3 focus:outline-none px-5 self-center shadow-default rounded-lg bg-white w-10/12 h-12"
                  placeholder={placeholder}
                  autoComplete="none"
                  {...register(name)}
                  type="text"
                  name={name}
                  id={name}
                />
                <input
                  className="mt-8 mr-8 self-end cursor-pointer text-white bg-primary p-1 px-4 rounded-lg w-20 h-10"
                  type="submit"
                  value={type === "editar" ? "Editar" : "Crear"}
                />
              </form>
            </div>
          )}
        </div>
      </div>
      <ToastContainer position="bottom-center" autoClose={2000} />
    </div>
  );
};
