// ** Routes Imports
import { lazy } from 'react';
import AuthRoutes from './auth';

// ** Default Route
const DefaultRoute = '/home';

// ** Merge Routes
const Routes = [
    {
      path: '/home',
      component: lazy(() => import('../../pages/home')),
      layout: 'NavLayout',
      exact: true
    },
    ...AuthRoutes
];

export { DefaultRoute, Routes };
