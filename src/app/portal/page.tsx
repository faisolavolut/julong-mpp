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
      if(!jwt) return navigate(`${process.env.NEXT_PUBLIC_API_PORTAL}/login`);
      try {
        await api.post(process.env.NEXT_PUBLIC_BASE_URL + "/api/cookies", {
          token: jwt,
        });
        const user = await api.get(
          `${process.env.NEXT_PUBLIC_API_PORTAL}/api/users/me`
        );
        const us = user.data.data;
        if (us) {
          localStorage.setItem("user", JSON.stringify(user.data.data));
          router.push("/d/master-data/organization");
        } else {
          navigate(`${process.env.NEXT_PUBLIC_API_PORTAL}/login`);
        }
      } catch (e) {
        navigate(`${process.env.NEXT_PUBLIC_API_PORTAL}/login`);
      }
    };
    run();
  }, []);
  return <></>;
}

export default Portal;
