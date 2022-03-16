export interface NotificationActions {
  sendNotify<T>(data: unknown | T): Promise<void>;
}
