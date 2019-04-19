import { User } from "./api";
import Callback from "./generic";
import Cookie from "js-cookie"

export default class UserAPI {
    api:User = new User();

    Login(user: string, pass: string, captcha: string, callback: Callback) {
        let cba = new Callback((resp)=>{
            Cookie.set("ACL", resp.type, { expires: 7 });
            callback.onSuccess(resp);
        }, callback.onFail);

        this.api.Login(user, pass, captcha, (p)=>{cba.RespHandler(p)});
    }
    Logout(callback: Callback) {
        let cba = new Callback((resp)=>{
            Cookie.remove("ACL");
            callback.onSuccess(resp);
        }, callback.onFail);
        this.api.Logout((p)=>{cba.RespHandler(p)});
    }
    Register(user: string, password: string, mail: string, nick: string, captcha: string, callback: Callback) {
        this.api.Register(user, password, mail, nick, captcha, (p)=>{callback.RespHandler(p)});
    }

    IsLogin() {
        var ACL = Cookie.get("ACL");
        return ACL !== undefined;
    }

    GetACL() {
        return Cookie.get("ACL");
    }
}
