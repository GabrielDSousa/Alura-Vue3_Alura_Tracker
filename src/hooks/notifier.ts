import { NotificationType } from "@/interfaces/INotification"
import { store } from "@/store"
import { NOTIFY } from "@/store/mutationsType"

type Notifier = {
    notify: (title:string, body:string, type: NotificationType) => void
}

export default () : Notifier => {
    const notify = (title: string, body: string, type: NotificationType) : void => {
        store.commit(NOTIFY, {
          title: title,
          body: body,
          type: type,
        });
      }

      return {
        notify
      }
}