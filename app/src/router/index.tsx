import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { DefaultRoute, Routes } from './routes'
import { RouteType } from '../types'
import { StorageService } from '../services';

import BlankLayout from '../components/layouts/blank-layout';
import NavLayout from '../components/layouts/nav-layout';

const NotAuthorized = lazy(() => import('../pages/misc/not-authorized'))

const Error = lazy(() => import('../pages/misc/error'))

const Router = () => {

  const Layouts: any = { BlankLayout, NavLayout }

  const currentActiveItem = null

  const LayoutRoutesAndPaths = (layout: string) => {
    const LayoutRoutes: RouteType[] = []
    const LayoutPaths: string[] = []

    if (Routes) {
      Routes.forEach((route: RouteType) => {
        if (route.layout === layout || (route.layout === undefined)) {
          LayoutRoutes.push(route)
          LayoutPaths.push(route.path)
        }
      })
    }

    return { LayoutRoutes, LayoutPaths }
  }

  const FinalRoute = (props: any) => {
    const route = props.route
    if (
      (!StorageService.isAuthenticated() && route.meta === undefined) ||
      (!StorageService.isAuthenticated() && route.meta && !route.meta?.authRoute && !route.meta?.publicRoute)
    ) {
      return <Redirect to='/sign-in' />
    } else if (route.meta && route.meta?.authRoute && StorageService.isAuthenticated()) {
      return <Redirect to='/' />
    } else {
      return <route.component {...props} />
    }
  }

  const ResolveRoutes = () => {
    return Object.keys(Layouts).map((layout, index) => {

      const LayoutTag = Layouts[layout]
      
      const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout)
      
      const routerProps = {}

      return (
        <Route path={LayoutPaths} key={index}>
          <LayoutTag
            routerProps={routerProps}
            currentActiveItem={currentActiveItem}
          >
            <Switch>
              {LayoutRoutes.map(route => {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact === true}
                    render={props => {
                      // Object.assign(routerProps, {
                      //   ...props,
                      //   meta: route.meta
                      // })
                      
                      return (
                        <>
                          <Suspense fallback={null}>
                            <FinalRoute route={route} {...props} />
                          </Suspense>
                        </>
                      )
                    }}
                  />
                )
              })}
            </Switch>
          </LayoutTag>
        </Route>
      )
    })
  }

  return (
    <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
      <Switch>
        <Route
          exact
          path='/'
          render={() => {
            return StorageService.isAuthenticated() ? <Redirect to={DefaultRoute} /> : <Redirect to='/sign-in' />
          }}
        />
        <Route
          exact
          path='/not-authorized'
          render={() => (
            <Layouts.BlankLayout>
              <NotAuthorized />
            </Layouts.BlankLayout>
          )}
        />
        {ResolveRoutes()}
        <Route 
          path='*' 
          render={() => (
            <Layouts.BlankLayout>
              <Error />
            </Layouts.BlankLayout>
          )}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
