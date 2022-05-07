import {IChats} from "./IChats";

export interface IGroups {
    id: string
    name: string
    theme: string
    chats: IChats[]
    otherChats: IChats[]
}