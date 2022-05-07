import {AppDispatch} from "../store";
import {groupsSlice} from "./GroupsSlice";
import axios from "axios";
import {IGroups} from "../../models/IGroups";


export const getGroups = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(groupsSlice.actions.groupsFetching())
        const response = await axios.get<IGroups[]>("https://nse-work.ru/test/build/API/getFullGroups.php", {
            params: {
                token: "asdfghqwerty123456asdfgh123456zxcvbn"
            }
        })
        dispatch(groupsSlice.actions.groupsFetchingSuccess(response.data))
    } catch (e: any) {
        dispatch(groupsSlice.actions.groupsFetchingError(e.message))
    }
}