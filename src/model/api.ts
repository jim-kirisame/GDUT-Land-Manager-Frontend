import axios, { AxiosResponse } from "axios";

export var baseUrl = "https://land.bigkeer.cn/api";

export class User {
    Login(user: string, password: string, captcha: string, callback: (resp: AxiosResponse) => void): void {
        const params = new URLSearchParams();
        params.append('user', user);
        params.append('password', password);

        post("/session",
            params,
            callback/*,
            { headers: { "x-captcha": captcha } }*/
        );
    }

    Logout(callback: (resp: AxiosResponse) => void) {
        del("/session", callback);
    }

    Register(user: string, password: string, mail: string, nick: string, captcha: string, callback: (resp: AxiosResponse) => void) {
        const params = new URLSearchParams();
        params.append('UserName', user);
        params.append('Password', password);
        params.append('Mail', mail);
        params.append('NickName', nick);
        
        post("/user", {
            "UserName": user,
            "Password": password,
            "Mail": mail,
            "NickName": nick
        }, callback, { headers: { "x-captcha": captcha } });
    }
}

function post(path: string, form: any, callback: (resp: AxiosResponse) => void, config?: any) {
    axios.post(baseUrl + path, form, config).then(
        function (resp) { if (callback != null) callback(resp); }
    ).catch(
        function (resp) { if (callback != null) callback(resp); }
    );
}

function get(path: string, callback: (resp: AxiosResponse) => void) {
    axios.get(baseUrl + path).then(
        function (resp) { if (callback != null) callback(resp); }
    ).catch(
        function (resp) { if (callback != null) callback(resp); }
    );
}

function del(path: string, callback: (resp: AxiosResponse) => void) {
    axios.delete(baseUrl + path).then(
        function (resp) { if (callback != null) callback(resp); }
    ).catch(
        function (resp) { if (callback != null) callback(resp); }
    );
}
