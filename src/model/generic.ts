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
            return;
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
