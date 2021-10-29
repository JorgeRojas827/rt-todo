import { useState } from "react";
import todoAPI from "../api/todoAPI";
import { DataUser } from "../interfaces/User";
import foto from "../assets/foto.png";

export const useMiembros = () => {
  const [user, setUser] = useState<DataUser>({
    name: "",
    image: foto,
  });

  const registrarMiembro = async (
    username: string,
    email: string,
    picture: string
  ) => {
    await todoAPI.post("/member/create", {
      username,
      email,
      picture,
    });
    console.log(username, picture);
    setUser({ name: username, image: picture });
    console.log(user);
  };

  return {
    user,
    registrarMiembro,
  };
};
