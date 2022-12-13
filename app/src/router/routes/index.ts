// ** Routes Imports
import DocsRoutes from './docs';
import AuthRoutes from './auth';

// ** Default Route
const DefaultRoute = '/docs';

// ** Merge Routes
const Routes = [
    ...DocsRoutes, 
    ...AuthRoutes
];

export { DefaultRoute, Routes };
