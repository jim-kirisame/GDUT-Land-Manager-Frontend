import Callback from "./generic";
import { GroupAPI } from "./api";

export default class UserGroup {
    GetSelfGroup(callback: Callback) {
        GroupAPI.GetSelf((p) => { callback.RespHandler(p); });
    }
}