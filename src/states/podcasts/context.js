import React, { createContext, useContext, useReducer, useMemo } from "react";
import Reducer from "./reducer";
import INIT_STATE from "./init-state";

const Context = createContext();
export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INIT_STATE);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
export const Selector = () => useContext(Context);
