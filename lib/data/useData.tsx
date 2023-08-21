import { useContext } from "react";
import { DataContext, IDataContext } from "./provider";

export default function useData(): IDataContext {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within an DataProvider');
  }
  return context;
};