"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CustomContextType {
    isMonarchLab: boolean;
    setIsMonarchLab: (value: boolean) => void;
}

const CustomContext = createContext<CustomContextType | undefined>(undefined);

export const CustomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMonarchLab, setIsMonarchLab] = useState(false);

  return (
    <CustomContext.Provider value={{ isMonarchLab, setIsMonarchLab }}>
      {children}
    </CustomContext.Provider>
  );
};

export const useCustomContext = () => {
  const context = useContext(CustomContext);
  if (!context) {
    throw new Error('useCustomContext must be used within a CustomProvider');
  }
  return context;
};
