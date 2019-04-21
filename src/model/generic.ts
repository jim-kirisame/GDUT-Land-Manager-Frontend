import { AxiosResponse } from "axios";

export class ResponseData {
    code: number = 0;
    message: string = "";
    result: any;
}

export default class Callback {
    constructor(public onSuccess: (resp: any) => void, public onFail: (code: number, message: string) => void) { }

    Fail(code: number, message: string) {
        if (this.onFail !== undefined) {
            this.onFail(code, message);
        }
    }

    Success(resp: any) {
        if (this.onSuccess !== undefined) {
            this.onSuccess(resp);
        }
    }

    RespHandler(resp: AxiosResponse) {
        if (resp === undefined) {
            console.log("resp undefined");
        }

        let response = resp.data as ResponseData;
        if (response !== undefined) {
            if (response.code !== 0) {
                this.Fail(response.code, response.message);
            } else {
                this.Success(response.result);
            }
        } else {
            console.log(resp);
            switch (resp.status) {
                case 401:
                    this.Fail(401, "用户需要登录");
                    break;
                case 403:
                    this.Fail(403, "当前用户没有权限操作此项目");
                    break;
                default:
                    this.Fail(resp.status, "未定义的返回代码");
            }
        }
    }
}

export class UserInfo {
    "uid": number;
    "name": string;
    "mail": string;
    "type": number;
    "status": number;
    "group"?: GroupInfo;
}

export class GroupInfo {
    "name": string;
    "mail": string;
    "uid": number;
    "users"?: Array<UserInfo>;
}

export class TaskInfo {
    taskID: number = 0;
    title: string = "";
    taskType: number = 0;
    assigner = new UserInfo();
    assignee?: UserInfo;
    description: string = "";
    result?: null;
    resource?: null;
    createAt: number = 0;
    updateAt: number = 0;
    finishAt?: number;
    status: number = 0;
}

export class TaskUtils {
    static dateStr(ts: number) {
        let d = new Date(ts);
        return (
            d.getFullYear().toString() +
            "-" +
            (d.getMonth() + 1).toString() +
            "-" +
            d.getDate().toString()
        );
    }

    static statusStr(s: number) {
        switch (s) {
            case 0:
                return "新建";
            case 1:
                return "进行中";
            case 2:
                return "待审核";
            case 3:
                return "已完成";
            default:
                return "未知状态";
        }
    }

    static typeStr(s: number) {
        switch (s) {
            case 0:
                return "初步调查";
            case 1:
                return "布点";
            case 2:
                return "采样";
            default:
                return "未知";
        }
    }
}

export class UserUtils {
    static typeStr(type: number) {
        switch (type) {
            case 0:
                return "管理员";
            case 1:
                return "用户";
            case 2:
                return "企业";
            case 3:
                return "监管部门";
            default:
                return "未知";
        }
    }
}
