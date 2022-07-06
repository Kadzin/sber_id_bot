
export interface IMessage {
    id: string,
    group_id: string,
    group_name: string,
    text: string,
    date: string,
    pinned: string,
    messages: [{
        chat_id: string,
        chat_name: string,
        message_id: string,
        pinned: string
    }],
    author: string
}