import { AxiosResponse } from "axios";
import User from "./user";
import { Md5 } from "ts-md5";
import gcoord from "gcoord";

export class ResponseData {
    code: number = 0;
    message: string = "";
    result: any;
}

export default class Callback {
    constructor(public onSuccess: (resp: any) => void, public onFail: (code: number, message: string) => void) {
        ;
    }

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

        if (resp.status === 401) {
            User.OnLogout();
            this.Fail(401, "用户需要登录");
            return;
        }

        let response = resp.data as ResponseData;
        if (response !== undefined) {
            if (response.code !== 0) {
                this.Fail(response.code, response.message);
            } else {
                this.Success(response.result);
            }
        } else {
            switch (resp.status) {
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
    result?: any;
    resource?: any;
    createAt: number = 0;
    updateAt: number = 0;
    finishAt?: number;
    status: number = 0;
}

export class TaskUtils {
    static numStr(d: number) {
        if (d < 10) return "0" + d.toString();
        else return d.toString();
    }

    static dateStr(ts: number) {
        let d = new Date(ts * 1000);
        return (
            d.getFullYear().toString() +
            "-" +
            TaskUtils.numStr(d.getMonth() + 1) +
            "-" +
            TaskUtils.numStr(d.getDate())
        );
    }

    static timeStr(ts: number) {
        let d = new Date(ts * 1000);
        return (
            TaskUtils.numStr(d.getHours()) +
            ":" +
            TaskUtils.numStr(d.getMinutes()) +
            ":" +
            TaskUtils.numStr(d.getSeconds())
        );
    }

    static shortTimeStr(ts: number) {
        let d = new Date(ts * 1000);
        return (
            TaskUtils.numStr(d.getHours()) +
            ":" +
            TaskUtils.numStr(d.getMinutes())
        );
    }

    static dateTimeShortStr(ts: number) {
        let d = new Date(ts * 1000);
        return (
            TaskUtils.numStr(d.getMonth() + 1) +
            "-" +
            TaskUtils.numStr(d.getDate()) +
            " " +
            TaskUtils.numStr(d.getHours()) +
            ":" +
            TaskUtils.numStr(d.getMinutes())
        );
    }

    static dateTimeStr(ts: number) {
        let d = new Date(ts * 1000);
        return d.toString();
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

    static getPicUrl(mail: string) {
        let lowmail = mail.toLowerCase().trim();
        let hash = Md5.hashStr(lowmail);
        return "https://www.gravatar.com/avatar/" + hash;
    }
}

export class ExploreTaskResult {
    taskID!: number;
    positionX!: number;
    positionY!: number;
    coordinate!: number;
    tracks: TrackData[] = [];
    photos: PhotoData[] = [];
}

export class TrackItemData {
    pointX!: number;
    pointY!: number;
    user!: number;
    timestamp!: number;
}

export class TrackData {
    trackID!: number;
    taskID!: number;
    userID!: number;
    track!: {
        coordinate: number;
        data: TrackItemData[];
    };
}

export class LocationData {
    positionX!: number;
    positionY!: number;
    coordinate!: number;
}

export class PhotoData {
    photoID!: number;
    author!: UserInfo;
    path!: string;
    description!: string;
    location!: LocationData;
    photoTime!: number;
    taskID!: number;
    subID!: number;
}

export class MapCoordinate {
    lng!: number;
    lat!: number;
}

export class CoordinateUtils {
    static convert(data: LocationData): MapCoordinate {
        let coord = gcoord.WGS84;
        switch (Number(data.coordinate)) {
            case 0:
                coord = gcoord.WGS84;
                break;
            case 1:
                coord = gcoord.GCJ02;
                break;
            case 2:
                coord = gcoord.BD09;
                break;
        }

        let result = gcoord.transform(
            [data.positionX, data.positionY],
            coord,
            gcoord.BD09
        ) as number[];
        return { lng: result[0], lat: result[1] };
    }
}
