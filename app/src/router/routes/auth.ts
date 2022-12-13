import { lazy } from 'react'

const AuthRoutes = [
  {
    path: '/sign-in',
    component: lazy(() => import('../../pages/auth/sign-in')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/sign-up',
    component: lazy(() => import('../../pages/auth/sign-up')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/recovery',
    component: lazy(() => import('../../pages/auth/recovery')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/not-authorized',
    component: lazy(() => import('../../pages/misc/not-authorized')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../pages/misc/error')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  }
]

export default AuthRoutes
