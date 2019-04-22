import axios, { AxiosResponse } from "axios";

export var baseUrl = "https://land.bigkeer.cn/api";
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
}

export class TaskAPI {
    static GetSelf(callback: (resp: AxiosResponse) => void) {
        get("/Task", callback);
    }
    static GetSelfAssign(callback: (resp: AxiosResponse) => void) {
        get("/Assign/task/active", callback);
    }
    static GetTask(id: number, callback: (resp: AxiosResponse) => void) {
        get("/Task/" + id, callback);
    }
}

export class GroupAPI {
    static GetSelf(callback: (resp: AxiosResponse) => void) {
        get("/UserGroup", callback);
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
