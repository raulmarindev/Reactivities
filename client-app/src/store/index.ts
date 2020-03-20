import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { reducer as activityDashboardReducer } from 'store/activityDashboard';
import {
    Action,
} from 'redux';

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
    activityDashboardReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunkAction<R> = ThunkAction<R, RootState, unknown, Action>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = configureStore({
    reducer: rootReducer,
    middleware: [
        // getDefaultMiddleware needs to be called with the state type
        ...getDefaultMiddleware<RootState>(),
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    ] as const // prevent this from becoming just `Array<Middleware>`
});

export type AppDispatch = ThunkDispatch<RootState, unknown, Action>;