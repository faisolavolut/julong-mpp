"use client";

import get from "lodash.get";
import { get_user } from "./get_user";
import { fa } from "@faker-js/faker";

export const showApprovel = (
  data: any,
  permision: string[],
  action?: "approve" | "reject"
) => {
  if (!permision?.length) {
    return null;
  }
  const a1 = [
    {
      status: "IN PROGRESS",
      permision: ["approval-mpr-dept-head"],
      column: ["department_head"],
      level: ["Level Head Department"],
    },
    {
      status: "NEED APPROVAL",
      permision: [
        "approval-mpr-dept-head",
        "approval-mpr-vp",
        "approval-mpr-ceo",
      ],
      column: ["department_head", "vp_gm_director", "ceo"],
      level: ["Level Head Department", "Level VP", "Level CEO"],
    },
    {
      status: "APPROVED",
      permision: ["approval-mpr-ho"],
      column: ["hrd_ho_unit"],
      level: ["Level HRD HO"],
    },
  ]; // tiga status yang dapat memunculkan approval
  const role = {
    head: permision.find((e) => e === "approval-mpr-dept-head"),
    dir: permision.find((e) => e === "approval-mpr-vp"),
    ceo: permision.find((e) => e === "approval-mpr-ceo"),
    ho_unit: permision.find((e) => e === "approval-mpr-ho"),
  };
  const isBudget = data?.mp_planning_header_id ? true : false;
  const isField = data?.organization_category === "Non Field" ? false : true;
  if (data?.status === "NEED APPROVAL") {
    if (!isBudget) {
      if (isField) {
        if (role.dir && data?.department_head && !data?.vp_gm_director) {
          return {
            approve: action === "reject" ? "REJECTED" : "APPROVED",
            level: "Level VP",
          };
        }
      } else {
        if (role.dir && data?.department_head && !data?.vp_gm_director) {
          return {
            approve: action === "reject" ? "REJECTED" : "NEED APPROVAL",
            level: "Level VP",
          };
        }else if (role.ceo && data?.vp_gm_director && !data?.ceo) {
          return {
            approve: action === "reject" ? "REJECTED" : "APPROVED",
            level: "Level CEO",
          };
        }
      }
    }
  } else if (data?.status === "IN PROGRESS") {
    const isYou = data?.requestor_id === get_user("m_employee.id");
    console.log("HALOO");
    if (!isYou) {
      return {
        approve:
          action === "reject"
            ? "REJECTED"
            : isBudget
            ? "APPROVED"
            : "NEED APPROVAL",
        level: "Level Head Department",
      };
    }
    return null;
  } else if (data?.status === "APPROVED") {
    if (isBudget) {
      if (role.ho_unit && !data?.hrd_ho_unit) {
        return {
          approve: action === "reject" ? "REJECTED" : "COMPLETED",
          level: "Level HRD HO",
        };
      }
    }
  }
  return null;
};
