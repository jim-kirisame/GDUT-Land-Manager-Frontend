import { UserAPI } from "./api";
import Callback from "./generic";
import Cookie from "js-cookie";
import { TypedEvent } from "./event";

export default class User {
    Login(user: string, pass: string, captcha: string, callback: Callback) {
        let cba = new Callback((resp) => {
            Cookie.set("ACL", resp.type, { expires: 7 });
            Cookie.set("Name", resp.name, { expires: 7 });
            User.IsLogin = true;
            User.OnLoginStatusChange.emit({});
            callback.onSuccess(resp);
        }, callback.onFail);

        UserAPI.Login(user, pass, captcha, (p) => { cba.RespHandler(p); });
    }
    Logout(callback: Callback) {
        let cba = new Callback((resp) => {
            User.OnLogout();
            callback.onSuccess(resp);
        }, callback.onFail);
        UserAPI.Logout((p) => { cba.RespHandler(p); });
    }
    Register(user: string, password: string, mail: string, nick: string, captcha: string, callback: Callback) {
        UserAPI.Register(user, password, mail, nick, captcha, (p) => { callback.RespHandler(p); });
    }

    static OnLogout() {
        Cookie.remove("ACL");
        Cookie.remove("Name");
        User.IsLogin = false;
        User.OnLoginStatusChange.emit({});
    }

    static IsLogin: boolean = Cookie.get("ACL") !== undefined;

    static OnLoginStatusChange = new TypedEvent();

    static get ACL() {
        return Cookie.get("ACL");
    }
    static get Name() {
        return Cookie.get("Name");
    }

    GetMe(callback: Callback) {
        let cba = new Callback((resp) => {
            Cookie.set("Name", resp.name, { expires: 7 });
            User.IsLogin = true;
            User.OnLoginStatusChange.emit({});
            callback.onSuccess(resp);
        }, callback.onFail);
        UserAPI.Me((p) => { cba.RespHandler(p); });
    }

    AlterMe(nick: string, oldPass: string, newPass: string, callback: Callback) {
        UserAPI.AlterMe(nick, oldPass, newPass, (p) => { callback.RespHandler(p); });
    }

    GetUser(id: number, callback: Callback) {
        UserAPI.GetUser(id, (p) => { callback.RespHandler(p); });
    }

    SearchGroup(name: string, callback: Callback) {
        UserAPI.SearchUser(name, "group", (p) => { callback.RespHandler(p); });
    }
}
