"use client";

import get from "lodash.get";
import { get_user } from "./get_user";

export const showApprovel = (
  data: any,
  permision: string[],
  action?: "approve" | "reject"
) => {
  const a1 = [
    {
      status: "IN PROGRESS",
      permision: ["approve-mpr-dept-head"],
      column: ["department_head"],
      level: ["Level Dept Head"],
    },
    {
      status: "NEED APPROVAL",
      permision: [
        "approve-mpr-dept-head",
        "approve-mpr-dir",
        "approve-mpr-ceo",
      ],
      column: ["department_head", "vp_gm_director", "ceo"],
      level: ["Level Dept Head", "Level VP/GM/Direktur", "Level CEO"],
    },
    {
      status: "APPROVED",
      permision: ["approve-mpr-ho"],
      column: ["hrd_ho_unit"],
      level: ["Level HRD/HO Unit"],
    },
  ]; // tiga status yang dapat memunculkan approval
  const status = a1.find((e) => data?.status === e.status);
  if (status) {
    let result = {} as any;
    const isPermision = permision.find((e) => status.permision.includes(e));
    if (isPermision) {
      console.log({ permision, er: status.permision });
      let pass = true
      status.permision.map((e, idx) => {
        if (permision.find((p) => p === e)) {
          if (pass && !get(result, status.column[idx])) {
            pass = false;
            result[status.column[idx]] = get_user("employee.id");
            result["level"] = status.level[idx];
          }
        }
      });
      if (action) {
        if (action === "approve") {
          switch (data?.status) {
            case "IN PROGRESS":
              result["approve"] = data?.mp_planning_header_id
                ? "APPROVED"
                : "NEED APPROVAL";
              break;

            case "NEED APPROVAL":
              result["approve"] =
                result?.level === "Level CEO"
                  ? "APPROVED"
                  : data?.organization_category === "Field"
                  ? "APPROVED"
                  : "NEED APPROVAL";
              break;
            case "APPROVED":
              result["approve"] = "COMPLETED";
              break;
            default:
              result["approve"] = "APPROVED";
              break;
          }
        } else {
          result["approve"] = "REJECTED";
        }
      }
      return result;
    }
    return null;
  }
  return null;
};
