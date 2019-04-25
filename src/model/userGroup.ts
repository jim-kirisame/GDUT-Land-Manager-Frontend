import Callback from "./generic";
import { GroupAPI } from "./api";

export default class UserGroup {
    GetSelfGroup(callback: Callback) {
        GroupAPI.GetSelf((p) => { callback.RespHandler(p); });
    }
    AddUser(uid: number, callback: Callback) {
        GroupAPI.AddUser(uid, (p) => { callback.RespHandler(p); });
    }
    DelUser(uid: number, callback: Callback) {
        GroupAPI.DelUser(uid, (p) => { callback.RespHandler(p); });
    }
}
