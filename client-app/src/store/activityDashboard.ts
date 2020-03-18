import agent from '../app/api/agent';
import { IActivity } from '../app/models/IActivity';
import {
    createAction,
    createReducer,
    Dispatch,
} from '@reduxjs/toolkit';

// Types
export interface ActivityDashboardState {
    activities: IActivity[];
    isFetching: boolean;
    selectedActivity: IActivity | undefined;
    editMode: boolean;
};

const initialState: ActivityDashboardState = {
    activities: [],
    isFetching: false,
    selectedActivity: undefined,
    editMode: false
};

// Action Creators
export const requestActivities = createAction('REQUEST_ACTIVITIES');
export const receiveActivities = createAction<IActivity[]>('RECEIVE_ACTIVITIES');
export const requestActivitiesError = createAction('REQUEST_ACTIVITIES_ERROR');
export const selectActivity = createAction('SELECT_ACTIVITY', (activityId: string) => {
    return {
        payload: {
            activityId
        }
    };
});
export const openCreateForm = createAction('OPEN_CREATE_FORM');
export const startCreateActivity = createAction('START_CREATE_ACTIVITY');
export const endCreateActivity = createAction('END_CREATE_ACTIVITY');

// Reducer
export const reducer = createReducer(initialState, builder =>
    builder
        .addCase(requestActivities, state => {
            return {
                ...state,
                isFetching: true
            };
        })
        .addCase(receiveActivities, (state, action) => {
            return {
                ...state,
                isFetching: false,
                activities: action.payload
            };
        })
        .addCase(selectActivity, (state, action) => {
            return {
                ...state,
                selectedActivity: state.activities.find(a => a.id === action.payload.activityId)
            };
        })
        .addCase(requestActivitiesError, state => {
            return {
                ...state,
                isFetching: false
            };
        })
        .addCase(openCreateForm, state => {
            return {
                ...state,
                selectedActivity: undefined,
                editMode: true
            };
        })
);

// side effects, only as applicable
// e.g. thunks, epics, etc
export const fetchActivities = () => async (dispatch: Dispatch) => {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestActivities());

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    try {
        const activities = await agent.Activities.list();
        dispatch(receiveActivities(activities.map(a => {
            return {
                ...a,
                date: a.date.split('.')[0]
            };
        })));
    } catch (error) {
        console.log(error);
        dispatch(requestActivitiesError());
    }
};
