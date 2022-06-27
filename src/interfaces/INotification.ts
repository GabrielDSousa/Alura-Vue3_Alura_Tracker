export enum NotificationType {
    SUCCESS,
    ERROR,
    WARNING
}

export interface INotification {
    title: string,
    body: string,
    type: NotificationType,
    id: number
}