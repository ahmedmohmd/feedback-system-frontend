import { createContext } from "react";

interface GlobalContextType {
  user: any;
  feedbacks: {
    data: any[];
    isError: boolean;
    isLoading: boolean;
  };

  onTag: (tags: string[]) => void;
  onSort: (tags: string) => void;
}

const GlobalContext = createContext<GlobalContextType | null>(null);

export default GlobalContext;
