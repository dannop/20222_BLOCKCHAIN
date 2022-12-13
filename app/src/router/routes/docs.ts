import { lazy } from 'react';

const DocsRoutes = [
  {
    path: '/docs',
    component: lazy(() => import('../../pages/docs/initial')),
    layout: 'NavLayout',
    exact: true
  },
  {
    path: '/docs/typography',
    component: lazy(() => import('../../pages/docs/typography')),
    layout: 'NavLayout'
  },
  {
    path: '/docs/buttons',
    component: lazy(() => import('../../pages/docs/buttons')),
    layout: 'NavLayout'
  },
  {
    path: '/docs/forms',
    component: lazy(() => import('../../pages/docs/forms')),
    layout: 'NavLayout'
  },
  {
    path: '/docs/form-validations',
    component: lazy(() => import('../../pages/docs/form-validations')),
    layout: 'NavLayout'
  }
];

export default DocsRoutes;
