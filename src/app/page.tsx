"use client";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function HomePage() {
  const router = useRouter();
  useEffect(() => {
    const run = async () => {
      try {
        const user = await api.get(
          `${process.env.NEXT_PUBLIC_API_PORTAL}/api/users/me`
        );
        const us = user.data.data;
        if (us) {
          router.push("/d/master-data/organization");
        } else {navigate(`${process.env.NEXT_PUBLIC_API_PORTAL}/login`);
        }
      } catch (e) {
        navigate(`${process.env.NEXT_PUBLIC_API_PORTAL}/login`);
      }
    };
    run()
  }, []);
  return <div className="px-4 pt-6"></div>;
}

export default HomePage;
