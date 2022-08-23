import { createContext, useReducer, useEffect } from "react";

export const LoginContext = createContext(null);

export const loginReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const LoginContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loginReducer, { user: null });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("admin"));
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);
  console.log(state);
  return (
    <LoginContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LoginContext.Provider>
  );
};
