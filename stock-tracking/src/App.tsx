import { Route, Routes } from 'react-router-dom';
import RootLayoutPage from './page/layout/RootLayoutPage';
import DashboardPage from './page/dashboard/DashboardPage';
import { DashboardProvider } from './context/dashboard/dashboard.context';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayoutPage />}>
        <Route
          path="/"
          element={
            <DashboardProvider>
              <DashboardPage />
            </DashboardProvider>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
