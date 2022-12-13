import { createContext, useState } from "react";

import Loader from "../components/loader";

interface ContextType {
  loading: boolean,
  setLoading: Function
}

const initialValue = {
  loading: false,
  setLoading: () => {}
}

const LoaderContext = createContext<ContextType>(initialValue);

export const LoaderProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false);
  
  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {loading && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
}

export default LoaderContext;