import { useState } from "react";

const usePassword = () => {
  const [password, setPassword] = useState<string>("");

  const append = (number: number) => {
    setPassword((password) => {
      if (password.length > 5) return password;
      return password + number;
    });
  };
  const remove = () => {
    setPassword((password) => password.slice(0, password.length - 1));
  };
  const clear = () => {
    setPassword("");
  };

  return { password, append, remove, clear };
};

export default usePassword;
