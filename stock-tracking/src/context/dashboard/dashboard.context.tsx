import { createContext, useContext, useState } from 'react';

type DashboardContextType = {
  chartTicker: string;
  setNewChartTicker: (ticker: string) => void;
};
const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      'useDashboardContext must be used within a DashboardProvider',
    );
  }
  return context;
};

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [chartTicker, setChartTicker] = useState('ACB');
  const setNewChartTicker = (ticker: string) => {
    setChartTicker(ticker);
  };
  return (
    <DashboardContext.Provider
      value={{ chartTicker: chartTicker, setNewChartTicker: setNewChartTicker }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
