// ConfigContext.js
import React, { createContext, useState } from 'react';
const localhost = 'http://localhost:3001'

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({
    apiUrl: 'https://serveradmin-whhj.onrender.com',
  });

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => React.useContext(ConfigContext);