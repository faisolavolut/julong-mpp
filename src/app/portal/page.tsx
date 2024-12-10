"use client";

import api from "@/lib/axios";
import { get_params_url } from "@/lib/getParamsUrl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Portal() {
  const router = useRouter();
  useEffect(() => {
    const jwt = get_params_url("token");
    const run = async () => {
await api.post( process.env.NEXT_PUBLIC_BASE_URL + "/api/cookies", {
        token: jwt
      })
      const user = await api.get("https://julong-portal.avolut.com/api/users/me")
      localStorage.setItem("user", JSON.stringify(user.data.data))
      router.push("/d/master-data/organization");
    }
    run() 
  }, []);
  return <></>;
}

export default Portal;
