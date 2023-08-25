import { RouteObject } from 'react-router-dom';
import Layout from '@/templates';

import Home from '@/pages/home';
import NotFound from '@/pages/NotFound';


export default [
  {
    path: '/',
    id: 'Home',
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: '/*',
    element: <NotFound />,
  },
] as RouteObject[];