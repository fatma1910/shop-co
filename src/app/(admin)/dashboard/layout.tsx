import Sidebar from "../components/Sidebar";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <SidebarProvider>
        <Sidebar />
        <main className="sm:w-[80%] ">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
        )
  }