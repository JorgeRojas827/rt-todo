import { useState } from "react";

export const useAlert = () => {
  const [alert, setAlert] = useState(false);

  const toggleAlert = () => {
    setAlert(!alert);
  };

  return {
    alert,
    toggleAlert,
  };
};
