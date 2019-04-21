import { TaskAPI } from "./api";
import Callback, { TaskInfo } from "./generic";

export default class Task {
    GetSelf(acl: number, callback: Callback) {
        if (acl === 2 || acl === 3) {
            TaskAPI.GetSelf((p) => { callback.RespHandler(p); });
        } else if (acl === 1) {
            TaskAPI.GetSelfAssign((p) => { callback.RespHandler(p); });
        } else {
            callback.Fail(-1, "此用户没有对应的解决方案");
        }
    }

    GetTask(id: number, callback: Callback) {
        TaskAPI.GetTask(id, (p) => { callback.RespHandler(p); });
    }
}

export class TaskQuery {
    count: number = 0;
    data: TaskInfo[] = [];
}
