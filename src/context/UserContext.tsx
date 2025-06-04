import React, {createContext, useState, useContext} from 'react';

interface UserContextType {
  hotelName: string;
  setHotelName: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [hotelName, setHotelName] = useState('');

  return (
    <UserContext.Provider value={{hotelName, setHotelName}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
