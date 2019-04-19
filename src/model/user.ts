import { User as UserAPI } from "./api";
import Callback from "./generic";
import Cookie from "js-cookie";

export default class User {
    api: UserAPI = new UserAPI();

    Login(user: string, pass: string, captcha: string, callback: Callback) {
        let cba = new Callback((resp) => {
            Cookie.set("ACL", resp.type, { expires: 7 });
            Cookie.set("Name", resp.name, { expires: 7 });
            User.IsLogin = true;
            callback.onSuccess(resp);
        }, callback.onFail);

        this.api.Login(user, pass, captcha, (p) => { cba.RespHandler(p); });
    }
    Logout(callback: Callback) {
        let cba = new Callback((resp) => {
            Cookie.remove("ACL");
            Cookie.remove("Name");
            User.IsLogin = false;
            callback.onSuccess(resp);
        }, callback.onFail);
        this.api.Logout((p) => { cba.RespHandler(p); });
    }
    Register(user: string, password: string, mail: string, nick: string, captcha: string, callback: Callback) {
        this.api.Register(user, password, mail, nick, captcha, (p) => { callback.RespHandler(p); });
    }

    static IsLogin : boolean = Cookie.get("ACL") !== undefined;

    static get ACL() {
        return Cookie.get("ACL");
    }
    static get Name() {
        return Cookie.get("Name");
    }

    GetMe(callback: Callback) {
        this.api.Me((p) => { callback.RespHandler(p); });
    }
}
