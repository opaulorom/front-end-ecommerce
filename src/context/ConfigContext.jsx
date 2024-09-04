// ConfigContext.js
import React, { createContext, useState } from 'react';
const localhost = 'http://localhost:3001'
const prodURL = 'https://serveradmin-whhj.onrender.com'
export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({
    apiUrl: localhost,
  });

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => React.useContext(ConfigContext);