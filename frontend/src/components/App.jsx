import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export function App() {
  return (
    <>
      <Navbar />
      {/* The Outlet component is a placeholder for children routes. This means that if we have a match for a children route, that component that corresponds to the children route will be rendered here. */}
      <Outlet />
    </>
  );
}
