"use client";

import api from "@/lib/axios";
import { get_params_url } from "@/lib/getParamsUrl";
import { useLocal } from "@/lib/use-local";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ServerErrorPage from "../components/comp/500";
import { userRoleMe } from "@/lib/getAccess";
import get from "lodash.get";
import {
  filterMenuByPermission,
  getFirstMenuWithUrl,
} from "@/lib/filterMenuByPermission";
import { configMenu } from "../d/config-menu";

function Portal() {
  const local = useLocal({
    ready: false,
    access: true,
  });
  const router = useRouter();
  useEffect(() => {
    local.ready = false;
    local.render();
    const jwt = get_params_url("token");
    const run = async () => {
      if (!jwt) return navigate(`${process.env.NEXT_PUBLIC_API_PORTAL}/login`);
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
          const roles = await userRoleMe();
          const permision = get(roles, "[0].permissions");
          const menuMe = filterMenuByPermission(configMenu, permision);
          if (!menuMe?.length) {
            local.access = false;
          } else {
            router.push(getFirstMenuWithUrl(menuMe));
          }
          local.ready = true;
          local.render();
        } else {
          navigate(`${process.env.NEXT_PUBLIC_API_PORTAL}/login`);
        }
      } catch (e) {
        navigate(`${process.env.NEXT_PUBLIC_API_PORTAL}/login`);
      }
    };
    run();
  }, []);
  if (local.ready) {
    if (!local.access) return <ServerErrorPage />;
  }
  return <></>;
}

export default Portal;
