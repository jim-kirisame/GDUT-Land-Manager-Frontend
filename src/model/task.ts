import { TaskAPI } from "./api";
import Callback, { TaskInfo, UserInfo } from "./generic";

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

    CreateTask(task: TaskInfo, callback: Callback) {
        let assignee = task.assignee === undefined ? 0 : task.assignee.uid;
        if (assignee === 0) {
            assignee = -1;
        }

        let resource = (task.resource === undefined) || (task.resource === null) ? 0 : task.resource.id === (undefined || null) ? 0 : task.resource.id;
        if (resource === 0) {
            resource = -1;
        }

        TaskAPI.Create(task.title, task.description, task.taskType, resource, assignee, (p) => { callback.RespHandler(p); });
    }

    AlterTask(task: TaskInfo, callback: Callback) {
        let assignee = task.assignee === undefined ? 0 : task.assignee.uid;
        if (assignee === 0) {
            assignee = -1;
        }

        let resource = task.resource === (undefined || null) ? 0 : task.resource.id === (undefined || null) ? 0 : task.resource.id;
        if (resource === 0) {
            resource = -1;
        }

        TaskAPI.Alter(task.taskID, task.title, task.description, task.taskType, resource, assignee, (p) => { callback.RespHandler(p); });
    }

    GetAssign(taskID: number, callback: Callback) {
        TaskAPI.GetAssign(taskID, (p) => { callback.RespHandler(p); });
    }

    AlterAssign(taskID: number, oldUser: UserInfo[], newUser: UserInfo[], callback: Callback) {
        let delUsers: number[] = [];
        let addUsers: number[] = [];

        oldUser.forEach((o) => {
            let check = false;
            newUser.forEach((n) => { if (o.uid === n.uid) check = true; });
            if (!check) {
                delUsers.push(o.uid);
            }
        });

        newUser.forEach((o) => {
            let check = false;
            oldUser.forEach((n) => { if (o.uid === n.uid) check = true; });
            if (!check) {
                addUsers.push(o.uid);
            }
        });

        console.log(delUsers, addUsers, oldUser, newUser);

        delUsers.forEach((id) => { TaskAPI.DeleteAssign(taskID, id, (p) => { callback.RespHandler(p); }); });
        addUsers.forEach((id) => { TaskAPI.AddAssign(taskID, id, (p) => { callback.RespHandler(p); }); });
    }

    SetStatus(taskID: number, status: number, callback: Callback) {
        TaskAPI.SetStatus(taskID, status, (p) => { callback.RespHandler(p); });
    }
}

export class TaskQuery {
    count: number = 0;
    data: TaskInfo[] = [];
}
