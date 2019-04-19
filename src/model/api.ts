import axios, { AxiosResponse } from "axios";

export var baseUrl = "https://land.bigkeer.cn/api";
//export var baseUrl = "http://localhost:2882/api";

axios.defaults.withCredentials = true;
export class User {
    // 用户登录
    Login(user: string, password: string, captcha: string, callback: (resp: AxiosResponse) => void): void {
        const params = new URLSearchParams();
        params.append("user", user);
        params.append("password", password);

        post("/session", params, callback, { headers: { "x-captcha": captcha } });
    }

    Logout(callback: (resp: AxiosResponse) => void) {
        del("/session", callback);
    }

    Register(user: string, password: string, mail: string, nick: string, captcha: string, callback: (resp: AxiosResponse) => void) {
        const params = new URLSearchParams();
        params.append("UserName", user);
        params.append("Password", password);
        params.append("Mail", mail);
        params.append("NickName", nick);

        post("/user", params, callback, { headers: { "x-captcha": captcha } });
    }

    Me(callback: (resp: AxiosResponse) => void) {
        get("/user/me", callback);
    }
}

function post(path: string, form: any, callback: (resp: AxiosResponse) => void, config?: any) {
    axios.post(baseUrl + path, form, config).then(
        (resp) => { if (callback != null) callback(resp); }
    ).catch(
        (resp) => { if (callback != null) callback(resp); }
    );
}

function get(path: string, callback: (resp: AxiosResponse) => void) {
    axios.get(baseUrl + path).then(
        (resp) => { if (callback != null) callback(resp); }
    ).catch(
        (resp) => { if (callback != null) callback(resp); }
    );
}

function del(path: string, callback: (resp: AxiosResponse) => void) {
    axios.delete(baseUrl + path).then(
        (resp) => { if (callback != null) callback(resp); }
    ).catch(
        (resp) => { if (callback != null) callback(resp); }
    );
}
