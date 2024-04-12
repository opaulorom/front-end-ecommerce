// UnreadContext.js

import React, { createContext, useState, useContext } from 'react';

const UnreadContext = createContext();

export const useUnreadCount = () => useContext(UnreadContext);

export const UnreadProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const updateUnreadCount = (count) => {
    setUnreadCount(count);
  };

  return (
    <UnreadContext.Provider value={{ unreadCount, updateUnreadCount }}>
      {children}
    </UnreadContext.Provider>
  );
};
