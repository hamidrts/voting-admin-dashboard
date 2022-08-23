import React from "react";
import { useLoginContext } from "./useLoginContext";

export function useLogout() {
  const { dispatch } = useLoginContext();
  const logout = () => {
    localStorage.removeItem("admin");
    dispatch({ type: "LOGOUT" });
  };
  return { logout };
}
