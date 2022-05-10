import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IGroups} from "../models/IGroups";
import {IGroupsUpdate} from "../models/IGroupsUpdate";
import {IGroupsUpdateResponse} from "../models/IGroupsUpdateReponse";
import {IGroupCreate} from "../models/IGroupCreate";

export const groupsAPI = createApi({
    reducerPath: 'groupsAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://nse-work.ru/test/build/API/'}),
    tagTypes: ['Group'],
    endpoints: (build) => ({
        fetchGroups: build.query<IGroups[], ''>({
            query: () => ({
                url: 'getFullGroups.php',
                params: {
                    token: 'asdfghqwerty123456asdfgh123456zxcvbn'
                }
            }),
            providesTags: result => ['Group']
        }),
        setGroupInfo: build.mutation<IGroupsUpdateResponse, IGroupsUpdate>({
            query: (params) => ({
                url: 'updateGroups.php',
                method: 'POST',
                body: {
                    token: 'asdfghqwerty123456asdfgh123456zxcvbn',
                    group_id: params.id,
                    chats: params.chats
                }
            }),
            invalidatesTags: result => ['Group']
        }),
        addGroup: build.mutation<IGroupsUpdateResponse, IGroupCreate>({
            query: (params) => ({
                url: 'createGroup.php',
                method: 'POST',
                body: {
                    token: 'asdfghqwerty123456asdfgh123456zxcvbn',
                    group_name: params.name,
                    theme: params.theme
                }
            }),
            invalidatesTags: result => ['Group']
        }),
        removeGroup: build.mutation<IGroupsUpdateResponse, string>({
            query: (params) => ({
                url: 'removeGroup.php',
                method: 'POST',
                body: {
                    token: 'asdfghqwerty123456asdfgh123456zxcvbn',
                    group_id: params
                }
            }),
            invalidatesTags: result => ['Group']
        })
    })
})