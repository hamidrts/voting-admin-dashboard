import { useState } from "react";
import { useLoginContext } from "./useLoginContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useLoginContext();

  const login = async (username, password) => {
    setError(null);
    setIsLoading(true);

    const response = await fetch("/voting/admin/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("admin", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
