'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserStore } from "@/global/userStore";

export const ClearSession = () => {
  const router = useRouter();
  const clearUser = UserStore((state) => state.clearUser);

  useEffect(() => {
    clearUser();
    router.replace("/login");
  }, [clearUser, router]);

  return null;
};