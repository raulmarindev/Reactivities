import agent from 'app/api/agent';
import { IActivity } from 'app/models/IActivity';
import { RootState } from 'store';
import { createAction, createReducer, Dispatch, } from '@reduxjs/toolkit';

// Types
export interface ActivityDashboardState {
    activities: IActivity[];
    isFetching: boolean;
    isSubmitting: boolean;
    selectedActivity: IActivity | undefined;
};

const initialState: ActivityDashboardState = {
    activities: [],
    isFetching: false,
    isSubmitting: false,
    selectedActivity: undefined
};

// Action Creators
const createActivityEnd = createAction('CREATE_ACTIVITY_END', (activity: IActivity) => ({ payload: { activity } }));
const createActivityError = createAction('CREATE_ACTIVITY_ERROR');
const createActivityStart = createAction('CREATE_ACTIVITY_START');

const updateActivityEnd = createAction('UPDATE_ACTIVITY_END', (activity: IActivity) => ({ payload: { activity } }));
const updateActivityError = createAction('UPDATE_ACTIVITY_ERROR');
const updateActivityStart = createAction('UPDATE_ACTIVITY_START');

const deleteActivityEnd = createAction('DELETE_ACTIVITY_END', (activityId: string) => ({ payload: { activityId } }));
const deleteActivityError = createAction('DELETE_ACTIVITY_ERROR');
const deleteActivityStart = createAction('DELETE_ACTIVITY_START', (activityId: string) => ({ payload: { activityId } }));

const receiveActivities = createAction<IActivity[]>('RECEIVE_ACTIVITIES');
const requestActivities = createAction('REQUEST_ACTIVITIES');
const requestActivitiesError = createAction('REQUEST_ACTIVITIES_ERROR');

const receiveActivityById = createAction<IActivity>('RECEIVE_ACTIVITY_BY_ID');
const requestActivityByIdNotFound = createAction('REQUEST_ACTIVITY_BY_ID_NOT_FOUND');
const requestActivityById = createAction('REQUEST_ACTIVITY_BY_ID', (activityId: string) => ({ payload: { activityId } }));
const requestActivityByIdError = createAction('REQUEST_ACTIVITY_BY_ID_ERROR');

export const openCreateForm = createAction('OPEN_CREATE_FORM');
export const selectActivity = createAction('SELECT_ACTIVITY', (activityId: string) => ({ payload: { activityId } }));

// Reducer
export const reducer = createReducer(initialState, builder =>
    builder
        .addCase(createActivityEnd, (state, { payload }) => (
            {
                ...state,
                isSubmitting: false,
                selectedActivity: payload.activity,
                activities: [...state.activities, payload.activity]
            }))
        .addCase(createActivityError, state => ({ ...state, isSubmitting: false }))
        .addCase(createActivityStart, state => ({ ...state, isSubmitting: true }))

        .addCase(updateActivityEnd, (state, { payload }) => (
            {
                ...state,
                isSubmitting: false,
                selectedActivity: payload.activity,
                activities: [...state.activities.filter(a => a.id !== payload.activity.id), payload.activity]
            }))
        .addCase(updateActivityError, state => ({ ...state, isSubmitting: false }))
        .addCase(updateActivityStart, state => ({ ...state, isSubmitting: true }))

        .addCase(deleteActivityEnd, (state, { payload }) => (
            {
                ...state,
                isSubmitting: false,
                activities: [...state.activities.filter(a => a.id !== payload.activityId)],
                selectedActivity: undefined,
            }))
        .addCase(deleteActivityError, state => ({ ...state, isSubmitting: false, selectedActivity: undefined }))
        .addCase(deleteActivityStart, (state, { payload }) => ({ ...state, isSubmitting: true, selectedActivity: state.activities.find(a => a.id === payload.activityId) }))

        .addCase(openCreateForm, state => ({ ...state, selectedActivity: undefined }))

        .addCase(receiveActivities, (state, { payload }) => ({ ...state, isFetching: false, activities: payload }))
        .addCase(requestActivities, state => ({ ...state, isFetching: true }))
        .addCase(requestActivitiesError, state => ({ ...state, isFetching: false }))

        .addCase(receiveActivityById, (state, { payload }) => ({ ...state, isFetching: false, selectedActivity: payload }))
        .addCase(requestActivityById, state => ({ ...state, isFetching: true }))
        .addCase(requestActivityByIdError, state => ({ ...state, isFetching: false }))
        .addCase(requestActivityByIdNotFound, state => ({ ...state, isFetching: false }))

        .addCase(selectActivity, (state, { payload }) => ({ ...state, selectedActivity: state.activities.find(a => a.id === payload.activityId) }))
);

// side effects, only as applicable
// e.g. thunks, epics, etc
export const fetchActivities = () => async (dispatch: Dispatch) => {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestActivities());

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.
    try {
        const activities = await agent.Activities.list();
        dispatch(receiveActivities(formatActivities(activities)));
    } catch (error) {
        console.log(error);
        dispatch(requestActivitiesError());
    }
};

export const fetchActivityById = (activityId: string) => async (dispatch: Dispatch, getState: () => RootState) => {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestActivityById(activityId));

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.
    try {
        let activity = getState().activityDashboardReducer.activities.find(a => a.id === activityId);
        if (!activity) {
            activity = await agent.Activities.details(activityId);
        }

        if (activity)
            dispatch(receiveActivityById(formatActivity(activity)));
        else
            dispatch(requestActivityByIdNotFound());
    } catch (error) {
        console.log(error);
        dispatch(requestActivityByIdError());
    }
};


export const createActivity = (activity: IActivity) => async (dispatch: Dispatch) => {
    dispatch(createActivityStart());

    try {
        await agent.Activities.create(activity);
        dispatch(createActivityEnd(activity));
    } catch (error) {
        console.log(error);
        dispatch(createActivityError());
    }
};

export const updateActivity = (activity: IActivity) => async (dispatch: Dispatch) => {
    dispatch(updateActivityStart());

    try {
        await agent.Activities.update(activity);
        dispatch(updateActivityEnd(activity));
    } catch (error) {
        console.log(error);
        dispatch(updateActivityError());
    }
};

export const deleteActivity = (activityId: string) => async (dispatch: Dispatch) => {
    dispatch(deleteActivityStart(activityId));

    try {
        await agent.Activities.delete(activityId);
        dispatch(deleteActivityEnd(activityId));
    } catch (error) {
        console.log(error);
        dispatch(deleteActivityError());
    }
};

const formatActivity = (activity: IActivity) => {
    if (activity && activity.date) {
        return {
            ...activity,
            date: activity.date.split('.')[0]
        };
    }

    return activity;
};

const formatActivities = (activities: IActivity[]): IActivity[] => {
    return activities.map(a => {
        return formatActivity(a);
    });
};;

// Selectors
export const getActivitiesByDate = (state: ActivityDashboardState) => {
    const activities = [...state.activities];

    return activities.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
};