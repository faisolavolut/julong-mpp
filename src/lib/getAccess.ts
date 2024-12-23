import get from "lodash.get";
import { get_user } from "./get_user";
import api from "./axios";

export const getAccess =  (keys: string, data: any[]) => {
  if (!Array.isArray(data) || !data?.length) return false;
  for (const role of data) {
    const permissionExists = role.permissions.some(
      (permission: any) => get(permission, "name") === keys
    );
    if (permissionExists) {
      return true;
    }
  }
  return false;
};

export const userRoleMe = async () => {
  const user = await api.get(
    `${process.env.NEXT_PUBLIC_API_PORTAL}/api/users/me`
  );
  const data = user?.data.data;
  const choosed_role = data?.choosed_role
  const roles = data.roles;
  if(!roles?.length) return []
  return roles.filter((e: any) => e?.name === choosed_role) || []
};
export const accessMe = async (keys: string) => {
    const user = await api.get(
      `${process.env.NEXT_PUBLIC_API_PORTAL}/api/users/me`
    );
    const data = user?.data.data;
    const roles = data.roles;
    
    if (!Array.isArray(roles) || !roles?.length) return false;
    for (const role of roles) {
      const permissionExists = role.permissions.some(
        (permission: any) => get(permission, "name") === keys
      );
      if (permissionExists) {
        return true;
      }
    }
    return false;
  };
  