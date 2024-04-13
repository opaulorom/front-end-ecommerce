import React, { createContext, useState, useContext, useEffect } from 'react';

const UnreadContext = createContext();

export const useUnreadCount = () => useContext(UnreadContext);

export const UnreadProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(() => {
    // Tente recuperar o valor do localStorage, se não existir, retorne 0
    return parseInt(localStorage.getItem('unreadCount')) || 0;
  });

  useEffect(() => {
    localStorage.setItem('unreadCount', unreadCount);
  }, [unreadCount]);

  const updateUnreadCount = (count) => {
    setUnreadCount(count);
  };

  return (
    <UnreadContext.Provider value={{ unreadCount, updateUnreadCount }}>
      {children}
    </UnreadContext.Provider>
  );
};