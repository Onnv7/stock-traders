import { createContext, useContext, useState, useEffect } from 'react';
import { Socket, io } from 'socket.io-client';

const SOCKET_URL = `${import.meta.env.VITE_SOCKET_HOST}:${import.meta.env.VITE_SOCKET_PORT}`; // Thay bằng URL server của bạn

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket'],
    });

    setSocket(newSocket);

    return () => {
      // newSocket.close();
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
