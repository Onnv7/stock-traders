import { Outlet } from 'react-router-dom';
import NavBarComponent from './components/NavBarComponent';
import TopBarComponent from './components/TopBarComponent';
import { useEffect } from 'react';
import { useSocket } from '../../context/socket/socket.context';
function RootLayoutPage() {
  // const { socket } = useSocket();

  // useEffect(() => {
  //   if (!socket) return;

  //   socket.on('message', (data) => {
  //     console.log('New message:', data);
  //   });

  //   return () => {
  //     socket.off('message');
  //   };
  // }, [socket]);
  return (
    <div className="grid h-full grid-cols-[1fr_4fr]">
      <div className="h-[100vh] overflow-hidden">
        <NavBarComponent />
      </div>
      <div className="flex h-full flex-col bg-[#ededef]">
        <TopBarComponent />
        <div className="grow-[1] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RootLayoutPage;
