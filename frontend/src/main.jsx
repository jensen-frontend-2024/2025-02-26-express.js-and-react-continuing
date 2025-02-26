import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './router';

// We will relace our App component with the RouterProvider component as our root component. This component will now act as the root component and provide logic, data and functionality to its future child components.

// This RouterProvider also need a router object as its props and this router object is the holds the configuration data on which components should be rendered and chich URLS they should be tied to. 

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
