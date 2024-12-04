"use client";

import api from "@/lib/axios";
import { get_params_url } from "@/lib/getParamsUrl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Portal() {
  const router = useRouter();
  useEffect(() => {
    const jwt = get_params_url("token");
    document.cookie = `jwtToken=${jwt}; path=/; Secure; HttpOnly; SameSite=Strict`;
    if (jwt) router.push("/d/master-data/organization");
    // const cookies = document.cookie.split(";").reduce((acc: any, cookie) => {
    //   const [key, value] = cookie.trim().split("=");
    //   acc[key] = value;
    //   return acc;
    // }, {});
    // const res = api.post( "http://localhost:3000/api/cookies", {
    //   token: jwt
    // })
    // // const token = cookies.jwtToken;
    // console.log({ jwt });
  }, []);
  return <></>;
}

export default Portal;
