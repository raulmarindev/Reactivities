import { ActivityDashboard } from 'features/activities/dashboard/ActivityDashboard';
import { ActivityDetails } from 'features/activities/dashboard/ActivityDetails';
import { ActivityForm } from 'features/activities/form/ActivityForm';
import { HomePage } from 'features/activities/home/HomePage';
import React, { FunctionComponent } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

interface IRoute {
    path: string;
    exact: boolean;
    component?: FunctionComponent<any>;
    routes?: IRoute[];
    render?: (props: RouteComponentProps<any>) => React.ReactNode;
}

export enum routesKeys {
    Home = 'Home',
    ActivitiesList = 'ActivitiesList',
    ActivityDetails = 'ActivityDetails',
    CreateActivityForm = 'CreateActivityForm',
    EditActivityForm = "EditActivityForm",
    InternalArea = "InternalArea"
}

export const Routes = new Map<routesKeys, IRoute>([
    [routesKeys.Home, { path: '/', exact: true, component: HomePage }],
    [routesKeys.ActivitiesList, { path: '/activities', exact: true, component: ActivityDashboard, }],
    [routesKeys.ActivityDetails, { path: '/activities/:id', exact: true, component: ActivityDetails, }],
    [routesKeys.CreateActivityForm, { path: '/createActivity', exact: true, component: ActivityForm, }],
    [routesKeys.EditActivityForm, { path: '/activities/edit/:id', exact: true, component: ActivityForm, }],
    [routesKeys.InternalArea, { path: '/(.+)', exact: true }],
]);

/**
 * Use this component for any new section of routes (any config object that has a "routes" property
 */
export const RenderRoute = (props: IRoute) => {
    return <Route {...props} />;
};