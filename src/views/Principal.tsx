import { useEffect, useRef } from "react";
import { LeftBar } from "../components/Leftbar/LeftBar";
import { Main } from "../components/Main/Main";
import { useModal } from "../hooks/useModal";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "react-google-login";
import { useMiembros } from "../hooks/useMiembros";
import React from "react";

export const Principal = () => {
  const { modal, toggleModal } = useModal();
  const mounted = useRef<boolean>();
  const { user, registrarMiembro } = useMiembros();

  useEffect(() => {
    if (!mounted.current) {
      toggleModal();
      mounted.current = true;
    }
  }, [user, toggleModal]);

  const clientId =
    "49630108708-k52548mms6dpctid879h75e3filga94s.apps.googleusercontent.com";

  return (
    <React.Fragment>
      <LeftBar />
      <Main />
      {modal && (
        <div className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-50 absolute left-0 top-0">
          <div className="bg-background relative rounded-lg w-72 md:w-96 h-36 md:h-48 flex flex-col justify-start items-center py-4">
            <div id="head" className="flex flex-col mt-3 items-center w-full">
              <h2 className="text-primary font-semibold md:text-lg text-base">
                Bienvenido:
              </h2>
              <div className="w-32 border-b hidden md:block mt-1 border-black opacity-10"></div>
            </div>
            <div id="content">
              <GoogleLogin
                clientId={clientId}
                render={(renderProps) => (
                  <div
                    onClick={renderProps.onClick}
                    className="flex flex-row space-x-5 p-3 cursor-pointer items-center shadow-default rounded-md md:mt-8 mt-4"
                  >
                    <FcGoogle className="md:w-7 w-5 md:h-7 h-5" />
                    <p className="font-semibold text-primary md:text-base text-xs">
                      Ingresar con cuenta de Google
                    </p>
                  </div>
                )}
                accessType="online"
                onSuccess={({ profileObj }: any) => {
                  registrarMiembro(
                    profileObj.name,
                    profileObj.email,
                    profileObj.imageUrl
                  );
                  toggleModal();
                }}
                onFailure={(res: any) => console.log(res)}
                cookiePolicy="single_host_origin"
              />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
