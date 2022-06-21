import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IGroups} from "../models/IGroups";
import {IGroupsUpdate} from "../models/IGroupsUpdate";
import {IGroupsUpdateResponse} from "../models/IGroupsUpdateReponse";
import {IGroupCreate} from "../models/IGroupCreate";
import {ISendMessage} from "../models/ISendMessage";
import {IUsers} from "../models/IUsers";
import {ILogin} from "../models/ILogin";
import {ILoginResponse} from "../models/ILoginResponse";
import {IMessage} from "../models/IMessage";
import {IDeleteMessage} from "../models/IDeleteMessage";
import {ISendMessage2Chat} from "../models/ISendMessage2Chat";

// dev host: https://nse-work.ru/test/build/API
// prod host: https://nse-work.ru/SberID/bot/web/API/


export const groupsAPI = createApi({
    reducerPath: 'groupsAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://nse-work.ru/test/build/API'}),
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
        checkCookie: build.mutation<IGroupsUpdateResponse, string>({
            query: (cookie) => ({
                url: 'auth.php',
                method: 'POST',
                body: {
                    cookie: cookie
                }
            })
        }),
        fetchUsers: build.query<IUsers[], ''>({
            query: () => ({
                url: 'getUsers.php',
                params: {
                    token: 'asdfghqwerty123456asdfgh123456zxcvbn'
                }
            })
        }),
        getUser: build.query<IUsers, string>({
            query: (cookie) => ({
                url: 'getUser.php',
                params: {
                    token: 'asdfghqwerty123456asdfgh123456zxcvbn',
                    cookie: cookie
                }
            })
        }),
        getMessages: build.query<IMessage[], ''>({
            query: () => ({
                url: 'getMessages.php',
                params: {
                    token: 'asdfghqwerty123456asdfgh123456zxcvbn'
                }
            }),
            providesTags: result => ['Group']
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
            }),
            invalidatesTags: result => ['Group']
        }),
        sendMessage2Chat: build.mutation<IGroupsUpdateResponse, ISendMessage2Chat>({
            query: (params) => ({
                url: 'sendMessage2Chat.php',
                method: 'POST',
                body: {
                    token: 'asdfghqwerty123456asdfgh123456zxcvbn',
                    chats: params.chat_id,//json_array[{id: string, label: string}]
                    message: params.message
                }
            }),
            invalidatesTags: result => ['Group']
        }),
        updateMessage: build.mutation<IGroupsUpdateResponse, ISendMessage>({
            query: (params) => ({
                url: 'updateMessage.php',
                method: 'POST',
                body: {
                    token: 'asdfghqwerty123456asdfgh123456zxcvbn',
                    message_id: params.id,
                    message: params.message
                }
            }),
            invalidatesTags: result => ['Group']
        }),
        deleteMessage: build.mutation<IGroupsUpdateResponse, string>({
            query: (params) => ({
                url: 'deleteMessage.php',
                method: 'POST',
                body: {
                    token: 'asdfghqwerty123456asdfgh123456zxcvbn',
                    message_id: params
                }
            }),
            invalidatesTags: result => ['Group']
        }),
        deleteMessageFromChat: build.mutation<IGroupsUpdateResponse, IDeleteMessage>({
            query: (params) => ({
                url: 'deleteMessageFromChat.php',
                method: 'POST',
                body: {
                    token: 'asdfghqwerty123456asdfgh123456zxcvbn',
                    chat_id: params.chat_id,
                    message_id: params.message_id,
                    parent_message_id: params.parent_message_id
                }
            }),
            invalidatesTags: result => ['Group']
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
        pinMessage: build.mutation<IGroupsUpdateResponse, IDeleteMessage>({
            query: (params) => ({
                url: 'pinMessage.php',
                method: 'POST',
                body: {
                    token: 'asdfghqwerty123456asdfgh123456zxcvbn',
                    chat_id: params.chat_id,
                    parent_message_id: params.parent_message_id
                }
            }),
            invalidatesTags: result => ['Group']
        }),
        unpinMessage: build.mutation<IGroupsUpdateResponse, IDeleteMessage>({
            query: (params) => ({
                url: 'unpinMessage.php',
                method: 'POST',
                body: {
                    token: 'asdfghqwerty123456asdfgh123456zxcvbn',
                    chat_id: params.chat_id,
                    parent_message_id: params.parent_message_id
                }
            }),
            invalidatesTags: result => ['Group']
        }),
        login: build.mutation<ILoginResponse, ILogin>({
            query: (params) => ({
                url: 'login.php',
                method: 'POST',
                body: {
                    login: params.id,
                    pass: params.pass
                }
            })
        }),
        logout: build.mutation<IGroupsUpdateResponse, string>({
            query: (params) => ({
                url: 'logout.php',
                method: 'POST',
                body: {
                    cookie: params
                }
            })
        })
    })
})
//end