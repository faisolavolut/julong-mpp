"use client";

import get from "lodash.get";
import { get_user } from "./get_user";
import { fa } from "@faker-js/faker";

export const showApprovel = (
  data: any,
  permision: string[],
  action?: "approve" | "reject"
) => {
  console.log({ data });
  const a1 = [
    {
      status: "IN PROGRESS",
      permision: ["approve-mpr-dept-head"],
      column: ["department_head"],
      level: ["Level Head Department"],
    },
    {
      status: "NEED APPROVAL",
      permision: [
        "approve-mpr-dept-head",
        "approve-mpr-dir",
        "approve-mpr-ceo",
      ],
      column: ["department_head", "vp_gm_director", "ceo"],
      level: ["Level Head Department", "Level VP", "Level CEO"],
    },
    {
      status: "APPROVED",
      permision: ["approve-mpr-ho"],
      column: ["hrd_ho_unit"],
      level: ["Level HRD HO"],
    },
  ]; // tiga status yang dapat memunculkan approval
  const role = {
    head: permision.find((e) => e === "approve-mpr-dept-head"),
    dir: permision.find((e) => e === "approve-mpr-dir"),
    ceo: permision.find((e) => e === "approve-mpr-ceo"),
    ho_unit: permision.find((e) => e === "approve-mpr-ho"),
  };
  const isBudget = data?.mp_planning_header_id ? true : false;
  const isField = data?.organization_category === "Non Field" ? false : true;
  if (data?.status === "NEED APPROVAL") {
    if (data?.department_head && !data?.vp_gm_director) {
      return {
        approve:
          action === "reject"
            ? "REJECTED"
            : isField
            ? "APPROVED"
            : "NEED APPROVAL",
        level: "Level VP",
      };
    } else if (data?.vp_gm_director && !data?.ceo) {
      return null
      return {
        approve: action === "reject" ? "REJECTED" : "APPROVED",
        level: "Level VP",
      };
    }
  } else if (data?.status === "IN PROGRESS") {
    const isYou = data?.requestor_id === get_user("m_employee.id");
    if (isYou) {
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
    if (data?.department_head && !data?.vp_gm_director) {
      return {
        approve:
          action === "reject"
            ? "REJECTED"
            : isField
            ? "APPROVED"
            : "NEED APPROVAL",
        level: "Level VP",
      };
    } else if (data?.vp_gm_director && !data?.ceo) {
      return {
        approve: action === "reject" ? "REJECTED" : "COMPLETED",
        level: "Level HRD HO",
      };
    }
  }
  return null;
};
