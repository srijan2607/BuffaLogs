import { addDays } from "date-fns";
import React, { createContext, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

interface DateContextState {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

const DateContext = createContext<DateContextState | null>(null);

interface DateContextProviderProps {
  children: React.ReactNode;
}

export const DateContextProvider: React.FC<DateContextProviderProps> = ({ children }) => {
  const [date, setDate] = useState<DateRange | undefined>(() => {
    // Default to March-April 2025 range to match fixture data
    // For production, change back to: { from: addDays(new Date(), -7), to: new Date() }
    return {
      from: new Date(2025, 2, 1),  // March 1, 2025
      to: new Date(2025, 4, 1),    // May 1, 2025
    };
  });

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  );
};


export const useDateContext = () => {
  const context = useContext(DateContext);

  if (!context) {
    throw new Error("useDateContext must be used within a DateContextProvider");
  }

  return context;
};
