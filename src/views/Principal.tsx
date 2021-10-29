import { useEffect, useRef } from "react";
import { LeftBar } from "../components/Leftbar/LeftBar";
import { Main } from "../components/Main/Main";
import { GoogleModal } from "../components/Modal/GoogleModal";
import { useModal } from "../hooks/useModal";
// import { LeftBarExpanded } from "../components/Leftbar/LeftBarExpanded";
import { useMiembros } from "../hooks/useMiembros";

export const Principal = () => {
  const { modal, toggleModal } = useModal();
  const mounted = useRef<boolean>();
  const { user } = useMiembros();

  useEffect(() => {
    if (!mounted.current) {
      toggleModal();
      mounted.current = true;
    }
  }, [user]);

  return (
    <>
      <LeftBar icon={user.image} />
      <Main />
      {modal && <GoogleModal title="Bienvenido" closable={toggleModal} />}
    </>
  );
};
