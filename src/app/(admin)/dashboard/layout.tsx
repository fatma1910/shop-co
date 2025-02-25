"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    if (user?.publicMetadata?.role !== "admin") {
      router.push("/");
      return;
    }

    setIsAuthorized(true); 
  }, [isSignedIn, user, isLoaded, router]);


  if (!isLoaded || !isAuthorized) {
    return null;
  }

  return (
    <SidebarProvider>
      <Sidebar />
      <main className="w-[100%] overflow-hidden">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
