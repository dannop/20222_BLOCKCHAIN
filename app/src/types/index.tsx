import { ReactChild, ReactChildren } from "react"

export interface RouteMetaType {
    authRoute?: boolean,
    publicRoute?: boolean
}

export interface RouteType {
    path: string,
    component: any,
    layout: string,
    exact?: boolean,
    meta?: RouteMetaType
}

export interface LayoutProps {
    children: ReactChild | ReactChildren,
    routerProps?: any,
    currentActiveItem?: string
}

export interface MenuType {
    id: string, 
    title: string,
    navLink: string
}

export interface ValidationParams {
    schema: any, 
    mode: string, 
    fields: any
}