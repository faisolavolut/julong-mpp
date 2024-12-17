import get from "lodash.get";
import { generateQueryString } from "./generateQueryString";

type EventActions = "before-onload" | "onload-param" | string; 
export const events = async (action: EventActions, data: any) => {
    switch (action) {
        case "onload-param":
            const params = {
                page: get(data, "paging"),
                page_size: get(data, "take"),
                search: get(data, "search")
            };
            return generateQueryString(params)
            return 
            break;
    
        default:
            break;
    }
    return null
}