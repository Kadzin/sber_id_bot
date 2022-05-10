import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IGroups} from "../models/IGroups";
import {IGroupsUpdate} from "../models/IGroupsUpdate";
import {IGroupsUpdateResponse} from "../models/IGroupsUpdateReponse";
import {IGroupCreate} from "../models/IGroupCreate";
import {ISendMessage} from "../models/ISendMessage";
import {IUsers} from "../models/IUsers";

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
        fetchUsers: build.query<IUsers[], ''>({
            query: () => ({
                url: 'getUsers.php',
                params: {
                    token: 'asdfghqwerty123456asdfgh123456zxcvbn'
                }
            }),
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
        }),
        sendMessage: build.mutation<IGroupsUpdateResponse, ISendMessage>({
            query: (params) => ({
                url: 'sendMessage.php',
                method: 'POST',
                body: {
                    token: 'asdfghqwerty123456asdfgh123456zxcvbn',
                    gid: params.id,
                    message: params.message
                }
            })
        })
    })
})