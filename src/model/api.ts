import axios, { AxiosResponse } from "axios";

export var baseDomain = "//land.bigkeer.cn"
export var baseUrl = baseDomain + "/api";
// export var baseUrl = "http://localhost:2882/api";

axios.defaults.withCredentials = true;
export class UserAPI {
    // 用户登录
    static Login(user: string, password: string, captcha: string, callback: (resp: AxiosResponse) => void): void {
        const params = new URLSearchParams();
        params.append("user", user);
        params.append("password", password);

        post("/session", params, callback, { headers: { "x-captcha": captcha } });
    }

    static Logout(callback: (resp: AxiosResponse) => void) {
        del("/session", callback);
    }

    static Register(user: string, password: string, mail: string, nick: string, captcha: string, callback: (resp: AxiosResponse) => void) {
        const params = new URLSearchParams();
        params.append("UserName", user);
        params.append("Password", password);
        params.append("Mail", mail);
        params.append("NickName", nick);

        post("/user", params, callback, { headers: { "x-captcha": captcha } });
    }

    static Me(callback: (resp: AxiosResponse) => void) {
        get("/user/me", callback);
    }

    static AlterMe(nick: string, oldPass: string, newPass: string, callback: (resp: AxiosResponse) => void) {
        const params = new URLSearchParams();
        params.append("nickname", nick);
        params.append("oldPassword", oldPass);
        params.append("newPassword", newPass);

        patch("/user", params, callback);
    }

    static GetUser(id: number, callback: (resp: AxiosResponse) => void) {
        get("/user/" + id, callback);
    }

    static SearchUser(name: string, type: string, callback: (resp: AxiosResponse) => void) {
        get("/User/search/" + name + "?type=" + type, callback);
    }

    static GetUsers(count: number, offset: number, callback: (resp: AxiosResponse) => void) {
        get("/User?count=" + count + "&offset=" + offset, callback);
    }

    static AlterACL(id: number, acl: number, callback: (resp: AxiosResponse) => void) {
        const params = new URLSearchParams();
        params.append("acl", acl.toString());
        put("/User/" + id + "/acl", params, callback);
    }
}

export class TaskAPI {
    // 获取自己名下的任务信息
    static GetSelf(callback: (resp: AxiosResponse) => void) {
        get("/Task", callback);
    }
    // 获取自己活动的任务信息
    static GetSelfAssign(callback: (resp: AxiosResponse) => void) {
        get("/Assign/task/active", callback);
    }
    // 获取指定id的任务信息
    static GetTask(id: number, callback: (resp: AxiosResponse) => void) {
        get("/Task/" + id, callback);
    }
    // 创建任务
    static Create(title: string, description: string, taskType: number, resource: number, assignee: number, callback: (resp: AxiosResponse) => void) {
        const params = new URLSearchParams();
        params.append("title", title);
        params.append("description", description);
        params.append("taskType", taskType.toString());
        params.append("resource", resource.toString());
        params.append("assignee", assignee.toString());

        post("/Task", params, callback);
    }
    // 修改任务详情
    static Alter(taskID: number, title: string, description: string, taskType: number, resource: number, assignee: number, callback: (resp: AxiosResponse) => void) {
        const params = new URLSearchParams();
        params.append("title", title);
        params.append("description", description);
        params.append("taskType", taskType.toString());
        params.append("resource", resource.toString());
        params.append("assignee", assignee.toString());

        put("/Task/" + taskID.toString(), params, callback);
    }
    // 获取任务分配
    static GetAssign(taskID: number, callback: (resp: AxiosResponse) => void) {
        get("/Assign/" + taskID, callback);
    }
    // 添加任务分配
    static AddAssign(taskID: number, userID: number, callback: (resp: AxiosResponse) => void) {
        const params = new URLSearchParams();
        params.append("userID", userID.toString());

        post("/Assign/" + taskID, params, callback);
    }
    // 删除任务分配
    static DeleteAssign(taskID: number, userID: number, callback: (resp: AxiosResponse) => void) {
        del("/Assign/" + taskID + "/" + userID, callback);
    }
    // 设置任务状态
    static SetStatus(taskID: number, status: number, callback: (resp: AxiosResponse) => void) {
        const params = new URLSearchParams();
        params.append("status", status.toString());

        patch("/Task/" + taskID + "/status", params, callback);
    }
}

export class GroupAPI {
    static GetSelf(callback: (resp: AxiosResponse) => void) {
        get("/UserGroup", callback);
    }
    static AddUser(uid: number, callback: (resp: AxiosResponse) => void) {
        const params = new URLSearchParams();
        params.append("uid", uid.toString());
        post("/UserGroup", params, callback);
    }
    static DelUser(uid: number, callback: (resp: AxiosResponse) => void) {
        del("/UserGroup/" + uid, callback);
    }
}

function post(path: string, form: URLSearchParams, callback: (resp: AxiosResponse) => void, config?: any) {
    axios.post(baseUrl + path, form, config).then(
        (resp) => { if (callback != null) callback(resp); }
    ).catch(
        (resp) => { if (callback != null) callback(resp.response); }
    );
}

function get(path: string, callback: (resp: AxiosResponse) => void) {
    axios.get(baseUrl + path).then(
        (resp) => { if (callback != null) callback(resp); }
    ).catch(
        (resp) => { if (callback != null) callback(resp.response); }
    );
}

function del(path: string, callback: (resp: AxiosResponse) => void) {
    axios.delete(baseUrl + path).then(
        (resp) => { if (callback != null) callback(resp); }
    ).catch(
        (resp) => { if (callback != null) callback(resp.response); }
    );
}

function patch(path: string, form: URLSearchParams, callback: (resp: AxiosResponse) => void) {
    axios.patch(baseUrl + path, form).then(
        (resp) => { if (callback != null) callback(resp); }
    ).catch(
        (resp) => { if (callback != null) callback(resp.response); }
    );
}

function put(path: string, form: URLSearchParams, callback: (resp: AxiosResponse) => void) {
    axios.put(baseUrl + path, form).then(
        (resp) => { if (callback != null) callback(resp); }
    ).catch(
        (resp) => { if (callback != null) callback(resp.response); }
    );
}
