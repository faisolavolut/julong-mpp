"use client";
import get from "lodash.get";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { configMenu } from "./d/config-menu";
import ServerErrorPage from "./components/comp/500";
import { useLocal } from "@/lib/utils/use-local";
import api from "@/lib/utils/axios";
import { userRoleMe } from "@/lib/utils/getAccess";
import {
  filterMenuByPermission,
  getFirstMenuWithUrl,
} from "@/lib/utils/filterMenuByPermission";

function HomePage() {
  const router = useRouter();
  const local = useLocal({
    ready: false,
    access: true,
  });
  useEffect(() => {
    const run = async () => {
      local.ready = false;
      local.render();
      try {
        const user = await api.get(
          `${process.env.NEXT_PUBLIC_API_PORTAL}/api/users/me`
        );
        const us = user.data.data;
        if (us) {
          try {
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
          } catch (ex) {
            navigate(`${process.env.NEXT_PUBLIC_API_PORTAL}/login`);
          }
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
  return <div className="px-4 pt-6"></div>;
}

export default HomePage;
