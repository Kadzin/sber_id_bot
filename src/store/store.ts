import {combineReducers, configureStore} from "@reduxjs/toolkit";
import groupsReducer from "./reducers/GroupsSlice"
import {groupsAPI} from "../services/GroupService";

const rootReducer = combineReducers({
    groupsReducer,
    [groupsAPI.reducerPath]: groupsAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(groupsAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']