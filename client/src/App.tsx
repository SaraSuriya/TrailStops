import { createBrowserRouter,RouterProvider, } from "react-router-dom";
import Map from './components/map/map';
import ErrorPage from './components/errorScreen/errorScreen';
import LoginScreen from './components/loginScreen/loginScreen';
import RegisterScreen from './components/registerScreen/registerScreen';
import Settings from './components/settings/settings';
import './App.css';

// main app component, handles routing
function App()  : JSX.Element {
  const router  = createBrowserRouter([
    {
      path: "/",
      element: <LoginScreen />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/register",
      element: <RegisterScreen />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/map",
      element: <Map />,
    },
    {
      path: '/settings',
      element: <Settings closeOverlay={undefined} settingsData={undefined} setSettingsData={undefined} markers={undefined} setMarkers={undefined} setSettingsClicked={undefined} />,
      errorElement: <ErrorPage />,
    },
    
  ]);
  

  return (
    <RouterProvider router={router} />
  );
}

export default App;
