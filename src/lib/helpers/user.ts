import { apix } from "../utils/apix";
import api from "../utils/axios";

export const userToken = async () => {
  if (process.env.NEXT_PUBLIC_MODE === "dev") {
    const user = localStorage.getItem("user");
    if (user) {
      const w = window as any;
      w.user = JSON.parse(user);
      return true;
    }
  } else {
    try {
      const res = await apix({
        port: "portal",
        value: "data.data",
        path: "/api/check-jwt-token",
        method: "get",
      });
      const jwt = res;

      await api.post(process.env.NEXT_PUBLIC_BASE_URL + "/api/cookies", {
        token: jwt,
      });
      const user = await api.get(
        `${process.env.NEXT_PUBLIC_API_PORTAL}/api/users/me`
      );
      const us = user.data.data;
      if (us) {
        localStorage.setItem("user", JSON.stringify(user.data.data));
        const w = window as any;
        w.user = JSON.parse(user.data.data);
        return true;
      }
    } catch (ex) {
      const user = localStorage.getItem("user");
      if (user) {
        const w = window as any;
        w.user = JSON.parse(user);
        return true;
      }
    }
  }
  return false;
  // const user = localStorage.getItem("user");
  // if (user) {
  //   const w = window as any;
  //   w.user = JSON.parse(user);
  // } else {
  //   try {
  //     const res = await api.get(
  //       `${process.env.NEXT_PUBLIC_API_PORTAL}/api/check-jwt-token`
  //     );
  //     const jwt = res.data.data;
  //     if (!jwt) return navigate(`${process.env.NEXT_PUBLIC_API_PORTAL}/login`);
  //     try {
  //       await api.post(process.env.NEXT_PUBLIC_BASE_URL + "/api/cookies", {
  //         token: jwt,
  //       });
  //       const user = await api.get(
  //         `${process.env.NEXT_PUBLIC_API_PORTAL}/api/users/me`
  //       );
  //       const us = user.data.data;
  //       console.log({ us });
  //       if (us) {
  //         localStorage.setItem("user", JSON.stringify(user.data.data));
  //         const roles = await userRoleMe();
  //       }
  //     } catch (e) {}
  //   } catch (ex) {}
  // }
};

export const checkJWT = async () => {};
