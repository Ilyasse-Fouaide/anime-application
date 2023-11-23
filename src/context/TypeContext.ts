import { createContext } from "react";

interface TypeContextProps {
  type: string | null;
  setType: (e: string) => void;
}

const TypeContext = createContext<TypeContextProps>(null);
export default TypeContext;
