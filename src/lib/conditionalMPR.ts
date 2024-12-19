"use client";

import get from "lodash.get";
import { get_user } from "./get_user";

export const showApprovel = (data: any, permision: string[]) => {
  const a1 = [
    {
      status: "IN PROGRESS",
      permision: ["approve-mpr-dept-head"],
      column: ["department_head"],
    },
    {
      status: "NEED APPROVAL",
      permision: [
        "approve-mpr-dept-head",
        "approve-mpr-dir",
        "approve-mpr-ceo",
      ],
      column: ["department_head", "vp_gm_director", "ceo"],
    },
    {
      status: "APPROVED",
      permision: ["approve-mpr-ho"],
      column: ["hrd_ho_unit"],
    },
  ]; // tiga status yang dapat memunculkan approval

  const status = a1.find((e) => data?.status === e.status);
  if (status) {
    let result = {} as any;
    const isPermision = permision.find((e) => status.permision.includes(e));
    if (isPermision) {
      status.permision.map((e, idx) => {
        if (permision.find((p) => p === e)) {
          if (!get(result, status.column[idx])) {
            result[status.column[idx]] = get_user("employee.id");
          }
        }
      });
      return result;
    }
    return null;
  }
  return null;
};
