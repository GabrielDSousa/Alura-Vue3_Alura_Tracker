import { NotificationType } from "@/interfaces/INotification";
import { store } from "@/store";
import { NOTIFY } from "@/store/mutationsType";

export const notifyMixin = {
    methods: {
        notify(title: string, body: string, type: NotificationType) {
            store.commit(NOTIFY, {
              title: title,
              body: body,
              type: type,
            });
          },
    }
}