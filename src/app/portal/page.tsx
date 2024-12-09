"use client";

import api from "@/lib/axios";
import { get_params_url } from "@/lib/getParamsUrl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Portal() {
  const router = useRouter();
  useEffect(() => {
    const jwt = get_params_url("token");
    // if (jwt) router.push("/d/master-data/organization");
    // const cookies = document.cookie.split(";").reduce((acc: any, cookie) => {
    //   const [key, value] = cookie.trim().split("=");
    //   acc[key] = value;
    //   return acc;
    // }, {});
    const run = async () => {

      const res = await api.post( process.env.NEXT_PUBLIC_BASE_URL + "/api/cookies", {
        token: jwt
      })
      const user = await api.get("/api/users/me")
      localStorage.setItem("user", JSON.stringify(user.data.data))
      router.push("/d/master-data/organization");
    }
    run() 
  }, []);
  return <></>;
}

export default Portal;
