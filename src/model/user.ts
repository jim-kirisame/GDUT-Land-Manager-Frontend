import { User } from "./api";
import Callback from "./generic";

export default class UserAPI {
    api:User = new User();

    Login(user: string, pass: string, captcha: string, callback: Callback) {
        this.api.Login(user, pass, captcha, (p)=>{callback.RespHandler(p)});
    }
    Logout(callback: Callback) {
        this.api.Logout((p)=>{callback.RespHandler(p)});
    }
    Register(user: string, password: string, mail: string, nick: string, captcha: string, callback: Callback) {
        this.api.Register(user, password, mail, nick, captcha, (p)=>{callback.RespHandler(p)});
    }
}
