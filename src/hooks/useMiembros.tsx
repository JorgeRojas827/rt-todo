import todoAPI from "../api/todoAPI";
import { useEntornos } from "./useEntornos";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setUser } from "../slice/userSlice";
import { ValidarMiembro } from "../interfaces/Miembro";

export const useMiembros = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { consumirEntornos } = useEntornos();

  const registrarMiembro = async (
    username: string,
    email: string,
    picture: string
  ) => {
    var validar: ValidarMiembro = await validarMiembro(email);
    if (validar.length === 0) {
      await todoAPI.post("/member/create", {
        username,
        email,
        picture,
      });
      validar = await validarMiembro(email);
    }
    dispatch(
      setUser({
        id_user: validar[0].id_user,
        email,
        name: username,
        image: picture,
      })
    );

    consumirEntornos(email);
  };

  const validarMiembro = async (email: string) => {
    const { data } = await todoAPI.get<ValidarMiembro>("login/" + email);
    return data;
  };

  return {
    user,
    registrarMiembro,
  };
};
