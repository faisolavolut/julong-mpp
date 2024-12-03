"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function HomePage() {
  const router = useRouter()
  useEffect(() => {
    
  router.push('/d/master-data/organization')
  }, [])
  return (
    <div className="px-4 pt-6">
    </div>
  );
}

export default HomePage;
