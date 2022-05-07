import {IGroups} from "../../models/IGroups";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface GroupsState {
    groups: IGroups[];
    isLoading: boolean;
    error: string;
}


const initialState: GroupsState = {
    groups: [],
    isLoading: false,
    error: ''
}

export const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        groupsFetching(state) {
            state.isLoading = true
        },
        groupsFetchingSuccess(state, action: PayloadAction<IGroups[]>) {
            state.isLoading = false
            state.groups = action.payload
        },
        groupsFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export default groupsSlice.reducer