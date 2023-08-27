import { RouteObject } from 'react-router-dom';
import Layout from '@/templates';

import Home from '@/pages/home';
import NotFound from '@/pages/NotFound';
import Results from '@/pages/results';


export default [
  {
    path: '/',
    id: 'Home',
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: '/results',
    id: 'Results',
    element: <Layout />,
    children: [{ index: true, element: <Results /> }],
  },
  {
    path: '/*',
    element: <NotFound />,
  },
] as RouteObject[];